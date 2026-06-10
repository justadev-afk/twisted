import { LolApi, RiotApi } from '../../src'
import { config } from '../config/config'

/**
 * LEAGUE-V4 — Get a full league by its leagueId.
 *
 * A leagueId identifies a whole division group; the response lists every
 * member in it. To find a leagueId we resolve our account, look up its ranked
 * entries, and then fetch the league one of those entries belongs to.
 */
export async function leagueExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()

  // 1. Resolve the Riot ID into a PUUID, then into a summonerId
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )
  const { response: summoner } = await lolApi.Summoner.getByPUUID(account.puuid, config.region)

  // 2. Fetch the player's ranked entries and pick one that exposes a leagueId.
  //    The order of entries is not guaranteed, so search rather than destructure.
  const { response: entries } = await lolApi.League.bySummoner(summoner.id, config.region)
  const entry = entries.find(o => o.leagueId)

  if (!entry) {
    console.log(`${account.gameName}#${account.tagLine} has no ranked league entries.`)
    return null
  }

  // 3. Fetch the full league that entry belongs to
  const { response: league } = await lolApi.League.get(entry.leagueId, config.region)

  console.log(`League "${league.name}" — ${league.tier} (${league.queue})`)
  console.log(`Members: ${league.entries.length}`)

  return league
}
