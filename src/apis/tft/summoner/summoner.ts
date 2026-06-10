import { endpointsTFTV1, IEndpoint } from '../../../endpoints/endpoints'
import { SummonerV4DTO } from '../../../models-dto/summoners/summoner.dto'
import { Regions } from '../../../constants'
import { FindSummonerBy } from '../../../constants/summoner.find'
import { BaseApiTft } from '../base/base.api.tft'

/**
 * Summoner methods
 */
export class SummonerTftApi extends BaseApiTft {
  private parsePath (endpoint: IEndpoint, by: FindSummonerBy) {
    let { path } = endpoint
    if (by === FindSummonerBy.ID) {
      path = path.replace('/$(by)/', '/')
    }
    return path
  }
  private genericRequest (by: FindSummonerBy, value: string, region: Regions) {
    const endpoint = { ...endpointsTFTV1.Summoner }
    endpoint.path = this.parsePath(endpoint, by)
    const params = {
      summonerName: value,
      by
    }
    return this.request<SummonerV4DTO>(region, endpoint, params)
  }
  /**
   * Get by id
   * @param id Summoner id
   * @param region Riot region
   */
  public async getById (id: string, region: Regions) {
    return this.genericRequest(FindSummonerBy.ID, id, region)
  }
  /**
   * Get by PUUID
   * @param puuid
   * @param region Riot region
   */
  public async getByPUUID (puuid: string, region: Regions) {
    return this.genericRequest(FindSummonerBy.PUUID, puuid, region)
  }
  /**
   * Get by PUUID
   * @param puuid
   * @param region Riot region
   */
  public async getByAccountID (accountId: string, region: Regions) {
    return this.genericRequest(FindSummonerBy.ACCOUNT_ID, accountId, region)
  }
}
