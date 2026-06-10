import { LolApi, RiotApi } from '../../src'
import { config } from '../config/config'

/**
 * LEAGUE-V4 — Get ranked entries for a summoner (bySummoner).
 *
 * This is the legacy lookup keyed by the encrypted summonerId. We first
 * resolve the account's PUUID (ACCOUNT-V1), then the summonerId (SUMMONER-V4),
 * and finally fetch every ranked queue the player has entries in.
 */
export async function summonerLeagueExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()

  // 1. Resolve the Riot ID into a PUUID
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )

  // 2. Resolve the summoner to obtain its encrypted summonerId
  const { response: summoner } = await lolApi.Summoner.getByPUUID(account.puuid, config.region)

  // 3. Fetch all ranked entries for that summoner (one per ranked queue)
  const { response: leagues } = await lolApi.League.bySummoner(summoner.id, config.region)

  console.log(`Ranked entries for ${account.gameName}#${account.tagLine}: ${leagues.length}`)
  for (const league of leagues) {
    console.log(
      `  ${league.queueType}: ${league.tier} ${league.rank} (${league.leaguePoints} LP) — ${league.wins}W/${league.losses}L`
    )
  }

  return leagues
}
