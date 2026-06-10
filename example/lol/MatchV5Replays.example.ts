import { LolApi, RiotApi } from '../../src'
import { config } from '../config/config'

/**
 * MATCH-V5 — Get replay (ROFL) file URLs for a player's recent matches.
 *
 * Replays are routed by region group (AMERICAS / ASIA / EUROPE), so we resolve
 * the account's PUUID via the Account API, then request the downloadable
 * replay file URLs.
 */
export async function matchV5ReplaysExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()

  // 1. Resolve the Riot ID (gameName#tagLine) into a PUUID
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )

  // 2. Replays are a Match-V5 endpoint -> use the account's region GROUP
  const { response: replays } = await lolApi.MatchV5.replays(account.puuid, config.regionGroup)

  console.log(`Player        : ${account.gameName}#${account.tagLine}`)
  console.log(`Replay files  : ${replays.total}`)
  if (replays.matchFileURLs[0]) {
    console.log(`First replay  : ${replays.matchFileURLs[0]}`)
  }

  return replays
}
