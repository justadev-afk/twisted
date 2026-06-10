import { IErrors } from '.'
import { SERVICE_UNAVAILABLE } from '../constants/http-status'
import { RateLimitDto } from '../models-dto/rate-limit/rate-limit.dto'

const message = 'Riot games api unavailable check: https://developer.riotgames.com/api-status/'

/**
 * Not api key found
 */
export class ServiceUnavailable extends Error implements IErrors {
  readonly status: number
  readonly name = 'RiotUnavailable'

  constructor (
    public readonly rateLimits: RateLimitDto,
    public readonly error: Error
  ) {
    super(message)
    this.status = SERVICE_UNAVAILABLE
    this.error = error
    Object.setPrototypeOf(this, ServiceUnavailable.prototype)
  }
}
