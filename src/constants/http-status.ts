/**
 * Minimal set of HTTP status codes used by the library.
 *
 * Node has no built-in HTTP status enum, so instead of pulling in the
 * `http-status-codes` package we keep the handful of codes the wrapper
 * actually relies on. Both the {@link StatusCodes} enum and individual named
 * constants are exported so call sites can use whichever reads best.
 */
export enum StatusCodes {
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  SERVICE_UNAVAILABLE = 503
}

export const FORBIDDEN = StatusCodes.FORBIDDEN
export const NOT_FOUND = StatusCodes.NOT_FOUND
export const TOO_MANY_REQUESTS = StatusCodes.TOO_MANY_REQUESTS
export const INTERNAL_SERVER_ERROR = StatusCodes.INTERNAL_SERVER_ERROR
export const NOT_IMPLEMENTED = StatusCodes.NOT_IMPLEMENTED
export const SERVICE_UNAVAILABLE = StatusCodes.SERVICE_UNAVAILABLE
