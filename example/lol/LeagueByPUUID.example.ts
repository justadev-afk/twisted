import { LolApi, RiotApi } from '../../src'
import { config } from '../config/config'

/**
 * LEAGUE-V4 — Get ranked entries for a summoner by PUUID.
 *
 * This is the modern replacement for the summonerId-based lookup: resolve the
 * account's PUUID through ACCOUNT-V1, then read its ranked entries directly.
 */
export async function leaguesByPUUIDExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()

  // 1. Resolve the Riot ID into a PUUID
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )

  // 2. Fetch every ranked entry for that PUUID (one per ranked queue)
  const { response: leagues } = await lolApi.League.byPUUID(account.puuid, config.region)

  console.log(`Ranked entries for ${account.gameName}#${account.tagLine}: ${leagues.length}`)
  for (const league of leagues) {
    console.log(
      `  ${league.queueType}: ${league.tier} ${league.rank} (${league.leaguePoints} LP)`
    )
  }

  return leagues
}
