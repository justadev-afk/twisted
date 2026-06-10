import { ApiKeyNotFound } from '../errors'
import { IEndpoint } from '../endpoints'
import { TOO_MANY_REQUESTS, SERVICE_UNAVAILABLE } from 'http-status-codes'
import { ApiResponseDTO } from '../models-dto/api-response/api-response'
import { RateLimitDto } from '../models-dto/rate-limit/rate-limit.dto'
import { GenericError } from '../errors/Generic.error'
import { RateLimitError } from '../errors/rate-limit.error'
import { IBaseApiParams, IParams, RequestOptions, waiter } from './base.utils'
import { ServiceUnavailable } from '../errors/service-unavailable.error'
import { BaseConstants, BaseApiGames } from './base.const'
import { Logger } from './logger.base'
import { RequestBase, HttpResponse } from './request.base'
import { RegionGroups } from '../constants'

export class BaseApi<Region extends string> {
  protected readonly game: BaseApiGames = BaseApiGames.LOL
  private baseUrl: string = BaseConstants.BASE_URL
  private key: string
  private concurrency: number | undefined
  private rateLimitRetry: boolean = true
  private rateLimitRetryAttempts: number = BaseConstants.RETRY_ATTEMPTS
  private debug = {
    logTime: false,
    logUrls: false,
    logRatelimits: false
  }

  constructor ()
  constructor (params: IBaseApiParams)
  /**
   * Base api
   * @param key Riot games api key
   */
  constructor (key: string)
  constructor (param?: string | IBaseApiParams) {
    this.key = process.env.RIOT_API_KEY || ''
    if (typeof param === 'string') {
      this.key = param
    } else if (param) {
      if (typeof param.key === 'string') {
        this.key = param.key
      }
      this.setParams(param)
    }
  }

  private setParams (param: IBaseApiParams) {
    if (typeof param.rateLimitRetry !== 'undefined') {
      this.rateLimitRetry = param.rateLimitRetry
    }
    if (typeof param.rateLimitRetryAttempts !== 'undefined') {
      this.rateLimitRetryAttempts = param.rateLimitRetryAttempts
    }
    if (typeof param.debug !== 'undefined') {
      if (typeof param.debug.logTime !== 'undefined') {
        this.debug.logTime = param.debug.logTime
      }
      if (typeof param.debug.logUrls !== 'undefined') {
        this.debug.logUrls = param.debug.logUrls
      }
      if (typeof param.debug.logRatelimits !== 'undefined') {
        this.debug.logRatelimits = param.debug.logRatelimits
      }
    }
    if(typeof param.baseURL !== 'undefined') {
      this.baseUrl = param.baseURL
    }
    this.concurrency = param.concurrency
    if (typeof param.concurrency !== 'undefined') {
      RequestBase.setConcurrency(param.concurrency)
    } else {
      RequestBase.setConcurrency(Infinity)
    }
  }

  private getRateLimits (headers: any): RateLimitDto {
    const h = headers || {}
    return {
      Type: h['x-rate-limit-type'] ?? null,
      AppRateLimit: h['x-app-rate-limit'] ?? null,
      AppRateLimitCount: h['x-app-rate-limit-count'] ?? null,
      MethodRateLimit: h['x-method-rate-limit'],
      MethodRatelimitCount: h['x-method-rate-limit-count'] ?? null,
      RetryAfter: +(h['retry-after'] ?? 0),
      EdgeTraceId: h['x-riot-edge-trace-id']
    }
  }

  private getBaseUrl () {
    return this.baseUrl.replace(':game', this.game)
  }

  private getApiUrl (endpoint: IEndpoint, params: IParams) {
    const {
      prefix,
      version,
      path
    } = endpoint
    const basePath = `${prefix}/v${version}/${path}`
    const re = /\$\(([^)]+)?\)/g
    let base = `${this.getBaseUrl()}/${basePath}`
    let match
    // eslint-disable-next-line no-cond-assign
    while (match = re.exec(base)) {
      const [key] = match
      const value = encodeURI(String(params[match[1]]))
      base = base.replace(key, value)
      re.lastIndex = 0
    }
    return base
  }

  private isRateLimitError (e: any) {
    if (!e) {
      return false
    }
    return e.status === TOO_MANY_REQUESTS || e.response?.status === TOO_MANY_REQUESTS
  }

  private isServiceUnavailableError (e: any) {
    if (!e) {
      return false
    }
    return e.status === SERVICE_UNAVAILABLE || e.response?.status === SERVICE_UNAVAILABLE
  }

  private getError (e: any) {
    const headers = this.getRateLimits(e?.response?.headers)
    if (this.isRateLimitError(e)) {
      return new RateLimitError(headers)
    }
    if (this.isServiceUnavailableError(e)) {
      return new ServiceUnavailable(headers, e)
    }
    // Otherwise generic error
    return new GenericError(headers, e)
  }

  private internalRequest<T> (options: RequestOptions): Promise<T> {
    return RequestBase.request<T>(options)
  }

  private async retryRateLimit<T> (region: Region | RegionGroups, endpoint: IEndpoint, params?: IParams, e?: any, queryParams?: any): Promise<ApiResponseDTO<T>> {
    const baseError = this.getError(e)
    const isRateLimitError = this.isRateLimitError(e) || this.isServiceUnavailableError(e)
    if (!this.rateLimitRetry || !isRateLimitError || this.rateLimitRetryAttempts < 1) {
      throw baseError
    }
    const forceError = true
    for (let i = 0; i <= this.rateLimitRetryAttempts; i++) {
      try {
        const response = await this.request<T>(region, endpoint, params, forceError, queryParams)
        return response
      } catch (error) {
        const parseError = this.getError(error)
        // Isn't rate limit error
        if (!this.isRateLimitError(error) && !this.isServiceUnavailableError(error)) {
          throw parseError
        }
        // Set a new attemp
        const {
          rateLimits: {
            RetryAfter
          }
        } = parseError
        const waitSeconds =
          this.isServiceUnavailableError(e) ?
            BaseConstants.SERVICE_UNAVAILABLE :
            BaseConstants.RATE_LIMIT
        const msToWait = ((RetryAfter || 0) * 1000) + (waitSeconds * 1000 * Math.random())
        // Log
        if (this.debug.logRatelimits) {
          Logger.rateLimit(endpoint, msToWait)
        }
        // Wait
        await waiter(msToWait)
      }
    }
    // Throw rate limit
    throw baseError
  }

  protected getParam (): IBaseApiParams {
    return {
      key: this.key,
      rateLimitRetry: this.rateLimitRetry,
      rateLimitRetryAttempts: this.rateLimitRetryAttempts,
      concurrency: this.concurrency,
      baseURL: this.baseUrl,
      debug: this.debug
    }
  }

  protected async request<T> (region: Region | RegionGroups, endpoint: IEndpoint, params?: IParams, forceError?: boolean, queryParams?: any): Promise<ApiResponseDTO<T>> {
    if (!this.key) {
      throw new ApiKeyNotFound()
    }
    // Url params
    params = params || {}
    params.region = region.toLowerCase()
    // Format
    const url = this.getApiUrl(endpoint, params)
    // Logger
    if (this.debug.logTime) {
      Logger.start(endpoint, url)
    }
    const options: RequestOptions = {
      url,
      method: 'GET',
      headers: {
        'X-Riot-Token': this.key
      },
      params: queryParams
    }
    if (this.debug.logUrls) {
      Logger.uri(options, endpoint)
    }
    try {
      const apiResponse = await this.internalRequest<HttpResponse<T>>(options)
      const { data, headers } = apiResponse
      return {
        rateLimits: this.getRateLimits(headers),
        response: data
      }
    } catch (e) {
      if (forceError) {
        throw e
      }
      return await this.retryRateLimit<T>(region, endpoint, params, e, queryParams)
    } finally {
      if (this.debug.logTime) {
        Logger.end(endpoint, url)
      }
    }
  }
}
