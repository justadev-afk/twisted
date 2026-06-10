import { IErrors } from '.'
import { RateLimitDto } from '../models-dto/rate-limit/rate-limit.dto'
import HttpStatusCodes from 'http-status-codes'

const message = 'Generic error'

interface HttpErrorLike extends Error {
  response?: {
    status?: number
    data?: any
  }
}

/**
 * Not api key found
 */
export class GenericError extends Error implements IErrors {
  readonly status: number
  readonly error: Error
  readonly rateLimits: RateLimitDto
  readonly body?: any
  readonly name = 'GenericError'

  constructor (rateLimits: RateLimitDto, error: HttpErrorLike) {
    super(error.message || message)
    this.status = error.response?.status || HttpStatusCodes.INTERNAL_SERVER_ERROR
    this.body = error.response?.data
    this.rateLimits = rateLimits
    this.error = error
    Object.setPrototypeOf(this, GenericError.prototype)
  }
}
