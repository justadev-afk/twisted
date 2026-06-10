import * as httpStatusCode from '../../../src/constants/http-status'
import { ThirdPartyCode } from '../../../src/apis/lol/thirdPartyCode/thirdPartyCode'
import { Regions } from '../../../src/constants'

describe('Third Party code', () => {
  const request = jest.fn()
  const testId = 'id'
  const testRegion = Regions.AMERICA_NORTH

  beforeEach(() => {
    (ThirdPartyCode.prototype as any).request = request
  })

  afterEach(() => {
    request.mockClear()
  })

  it('should return valid code', async () => {
    const code = 'ORIGENGG'
    request.mockImplementation(() => ({ response: code }))
    const api = new ThirdPartyCode()
    const data = await api.get(testId, testRegion)
    expect(data.response.code).toEqual(code)
  })

  it('should return null when an error is 500', async () => {
    // Mock error 500
    request.mockImplementation(() => {
      const error: any = new Error()
      error.statusCode = httpStatusCode.INTERNAL_SERVER_ERROR
      throw error
    })
    const api = new ThirdPartyCode()
    const data = await api.get(testId, testRegion)
    expect(data.response.code).toEqual(null)
  })

  it('should return null when an error is 404', async () => {
    // Mock error 404
    request.mockImplementation(() => {
      const error: any = new Error()
      error.statusCode = httpStatusCode.NOT_FOUND
      throw error
    })
    const api = new ThirdPartyCode()
    const data = await api.get(testId, testRegion)
    expect(data.response.code).toEqual(null)
  })
})
