import { LolApi, RiotApi } from '../../../src'
import { config } from '../../config/config'

/**
 * DEPRECATED — MATCH-V4 match listing (`/lol/match/v4/matchlists/by-account/{accountId}`).
 *
 * Replaced by Match-V5 `LolApi.MatchV5.list(puuid, ...)`, which returns plain
 * string match ids. The V4 listing instead returns rich reference objects
 * (gameId, champion, queue, role, lane, timestamp...) keyed by the encrypted
 * accountId, which we resolve via the Riot Account API.
 */
export async function matchListingExample () {
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

  // 2. List the match history (V4 keys this by the encrypted accountId)
  const { response: listing } = await lolApi.Match.list(summoner.accountId, region)

  console.log(`Returned ${listing.matches.length} of ${listing.totalGames} games`)
  const first = listing.matches[0]
  if (first) {
    console.log(`Most recent: game ${first.gameId} | champion ${first.champion} | queue ${first.queue}`)
  }

  return listing
}
