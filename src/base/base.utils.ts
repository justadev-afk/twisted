export interface IParams {
  [key: string]: string | number
}

/**
 * Minimal request options shared across the request pipeline.
 * Replaces axios' `AxiosRequestConfig` now that the library uses native `fetch`.
 */
export interface RequestOptions {
  url: string
  method?: string
  headers?: Record<string, string>
  /**
   * Query string values. Serialized with {@link stringifyParams}.
   */
  params?: Record<string, any>
}

export interface IBaseApiParams {
  /**
   * If api response is 429 (rate limits) try reattempt after needed time (default true)
   */
  rateLimitRetry?: boolean
  /**
   * Number of time to retry after rate limit response (default 1)
   */
  rateLimitRetryAttempts?: number
  /**
   * Riot games api key
   */
  key?: string,
  /**
   * Concurrency calls to riot (default infinity)
   * Concurrency per method (example: summoner api, match api, etc)
   */
  concurrency?: number,
  /**
   * BaseURL for a rate limiting proxy (default: "https://$(region).api.riotgames.com/:game")
   * ${region} and :game are expected but not required variables
   */
  baseURL?: string
  /**
   * Debug methods
   */
  debug?: {
    /**
     * Log methods execution time (default false)
     */
    logTime?: boolean
    /**
     * Log urls (default false)
     */
    logUrls?: boolean
    /**
     * Log when is waiting for rate limits (default false)
     */
    logRatelimits?: boolean
  }
}

export function waiter (ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

/**
 * Serialize query params into a query string.
 *
 * - `null`/`undefined` values are skipped (matching axios behaviour).
 * - Arrays are expanded into repeated keys (`queue=420&queue=440`), which is
 *   the format the Riot API expects.
 */
export function stringifyParams (params: Record<string, any>): string {
  const search = new URLSearchParams()
  for (const key of Object.keys(params)) {
    const value = params[key]
    if (value === undefined || value === null) {
      continue
    }
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item === undefined || item === null) {
          continue
        }
        search.append(key, String(item))
      }
    } else {
      search.append(key, String(value))
    }
  }
  return search.toString()
}

export function getUrlFromOptions (options: RequestOptions): string {
  let uri = options.url
  if (options.params) {
    const query = stringifyParams(options.params)
    if (query) {
      uri += `?${query}`
    }
  }
  return uri
}
