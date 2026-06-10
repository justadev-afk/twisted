import PromiseQueue from 'promise-queue'
import { RequestOptions, getUrlFromOptions } from './base.utils'

/**
 * Successful response shape returned by the request pipeline.
 * Mirrors the small subset of axios' response that the library relies on.
 */
export interface HttpResponse<T = any> {
  data: T
  headers: Record<string, string>
  status: number
}

/**
 * Error thrown when the Riot API responds with a non 2xx status code.
 * Keeps the same shape the rest of the codebase used to read from axios errors
 * (`error.status` and `error.response.{status,data,headers}`).
 */
export class HttpError extends Error {
  readonly status: number
  readonly response: {
    status: number
    data: any
    headers: Record<string, string>
  }

  constructor (status: number, statusText: string, data: any, headers: Record<string, string>) {
    super(statusText || `Request failed with status code ${status}`)
    this.name = 'HttpError'
    this.status = status
    this.response = { status, data, headers }
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}

function headersToObject (headers: Headers): Record<string, string> {
  const result: Record<string, string> = {}
  headers.forEach((value, key) => {
    result[key] = value
  })
  return result
}

async function parseBody (response: Response): Promise<any> {
  const text = await response.text()
  if (!text) {
    return undefined
  }
  try {
    return JSON.parse(text)
  } catch (e) {
    // Some endpoints (e.g. third party code) reply with plain text
    return text
  }
}

export class RequestBase {
  static queue: PromiseQueue

  private static async sendRequest<T> (options: RequestOptions): Promise<HttpResponse<T>> {
    const url = getUrlFromOptions(options)
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: options.headers
    })
    const headers = headersToObject(response.headers)
    const data = await parseBody(response)
    if (!response.ok) {
      throw new HttpError(response.status, response.statusText, data, headers)
    }
    return { data, headers, status: response.status }
  }

  private static getQueue () {
    if (!RequestBase.queue) {
      RequestBase.queue = new PromiseQueue(Infinity, Infinity)
    }
    return RequestBase.queue
  }

  static setConcurrency (concurrency: number) {
    RequestBase.queue = new PromiseQueue(concurrency, Infinity)
  }

  static request<T> (options: RequestOptions): Promise<T> {
    return RequestBase.getQueue().add(() => RequestBase.sendRequest(options) as any)
  }
}
