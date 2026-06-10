import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../../../constants/http-status'
import { Regions } from '../../../constants'
import { endpointsV4 } from '../../../endpoints/endpoints'
import { ThirdPartyCodeDTO } from '../../../models-dto/third-party-code/third-party-code.dto'
import { ApiResponseDTO } from '../../../models-dto/api-response/api-response'
import { BaseApiLol } from '../base/base.api.lol'

/**
 * Third party methods
 */
export class ThirdPartyCode extends BaseApiLol {
  private errorHandler (e: any) {
    const { statusCode } = e.error || e
    if (statusCode !== INTERNAL_SERVER_ERROR && statusCode !== NOT_FOUND) {
      throw e
    }
  }
  /**
   * NOTE: The third-party-code-v4 endpoint was sunset on March 11th, 2024 and is no longer available.
   * Valid codes must be no longer than 256 characters and only use valid characters: 0-9, a-z, A-Z, and -
   * @param encryptedSummonerId
   * @param region
   */
  public async get (encryptedSummonerId: string, region: Regions): Promise<ApiResponseDTO<ThirdPartyCodeDTO>> {
    let code
    let rateLimits
    const params = {
      encryptedSummonerId
    }
    try {
      const data = await this.request<string>(region, endpointsV4.ThirdPartyCode, params)
      rateLimits = data.rateLimits
      code = data.response
    } catch (e) {
      this.errorHandler(e)
      code = null
    }
    return {
      rateLimits,
      response: {
        code
      }
    }
  }
}
