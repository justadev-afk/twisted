import { endpointsV4, IEndpoint } from '../../../endpoints/endpoints'
import { SummonerV4DTO } from '../../../models-dto/summoners/summoner.dto'
import { Regions } from '../../../constants'
import { FindSummonerBy } from '../../../constants/summoner.find'
import { BaseApiLol } from '../base/base.api.lol'

/**
 * Summoner methods
 */
export class SummonerApi extends BaseApiLol {
  private parsePath (endpoint: IEndpoint, by: FindSummonerBy) {
    let { path } = endpoint
    if (by === FindSummonerBy.ID) {
      path = path.replace('/$(by)/', '/')
    }
    return path
  }
  private genericRequest (by: FindSummonerBy, value: string, region: Regions) {
    const endpoint = { ...endpointsV4.Summoner }
    endpoint.path = this.parsePath(endpoint, by)
    const params = {
      summonerName: value,
      by
    }
    return this.request<SummonerV4DTO>(region, endpoint, params)
  }
  /**
   * @deprecated use geetByPUUID instead
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
   * @deprecated Use getByPUUID instead
   * Get by account ID
   * @param accountId
   * @param region Riot region
   */
  public async getByAccountID (accountId: string, region: Regions) {
    return this.genericRequest(FindSummonerBy.ACCOUNT_ID, accountId, region)
  }
}
