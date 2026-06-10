import { NOT_FOUND } from '../../../constants/http-status'
import { Regions } from '../../../constants'
import { FeaturedGamesDTO } from '../../../models-dto/spectator/featured-games.dto'
import { endpointsV5 } from '../../../endpoints/endpoints'
import { CurrentGameInfoDTO } from '../../../models-dto/spectator/current-game-info.dto'
import { SpectatorNotAvailableDTO } from '../../../models-dto/spectator/spectator-not-available.dto'
import { BaseApiLol } from '../base/base.api.lol'

/**
 * @deprecated Use SpectatorV5Api instead
 * Spectator methods
 */
export class SpectatorApi extends BaseApiLol {
  private errorHandler (e: any) {
    const { statusCode } = e.error || e
    if (statusCode !== NOT_FOUND) {
      throw e
    }
  }
  /**
   * Get featured games
   * @param region
   */
  public async featuredGames (region: Regions) {
    return this.request<FeaturedGamesDTO>(region, endpointsV5.SpectatorFeaturedGames)
  }
  /**
   * Get summoner active game
   * @param summonerPUUID
   * @param region
   */
  public async activeGame (summonerPUUID: string, region: Regions) {
    const params = {
      summonerPUUID
    }
    try {
      return await this.request<CurrentGameInfoDTO>(region, endpointsV5.SpectatorSummoner, params)
    } catch (e) {
      this.errorHandler(e)
      const message = 'No active game found'
      const response: SpectatorNotAvailableDTO = {
        message
      }
      return response
    }
  }
}
