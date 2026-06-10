import { LolApi, RiotApi, Constants } from '../../../src'
import { config } from '../../config/config'
import { MatchQueryDTO } from '../../../src/models-dto'

/**
 * DEPRECATED — MATCH-V4 match listing with filters.
 *
 * Replaced by Match-V5 `LolApi.MatchV5.list`. The V4 listing accepted a rich
 * query (`MatchQueryDTO`) letting you filter by champion, queue, season and a
 * time window — here we ask only for games played on a specific champion.
 */
export async function matchListingFilteringExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()
  const { region } = config

  // 1. Resolve the Riot ID into a PUUID, then load the summoner
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )
  const { response: summoner } = await lolApi.Summoner.getByPUUID(account.puuid, region)

  // 2. Build a filter: only games where the player picked Twisted Fate
  const filter: MatchQueryDTO = {
    champion: Constants.Champions.TWISTED_FATE
  }

  // 3. List the filtered match history (V4 keys this by the encrypted accountId)
  const { response: listing } = await lolApi.Match.list(summoner.accountId, region, filter)

  console.log(`Twisted Fate games: ${listing.matches.length}`)

  return listing
}
