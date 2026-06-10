import { LolApi, Constants } from '../../src'
import { config } from '../config/config'

/**
 * LEAGUE-V4 — Get all (paginated) league entries for a queue / tier / division.
 *
 * Unlike LEAGUE-EXP-V4, this endpoint does not cover the apex tiers
 * (MASTER / GRANDMASTER / CHALLENGER); use the *ByQueue helpers for those.
 */
export async function leagueEntriesExample () {
  const lolApi = new LolApi()

  // Fetch page 1 of every Bronze I solo-queue player on this region
  const { response: entries } = await lolApi.League.entries(
    Constants.Queues.RANKED_SOLO_5x5,
    Constants.Tiers.BRONZE,
    Constants.Divisions.I,
    config.region
  )

  console.log(`Bronze I (${Constants.Queues.RANKED_SOLO_5x5}) entries on page 1: ${entries.length}`)
  for (const entry of entries.slice(0, 5)) {
    console.log(`  ${entry.leaguePoints} LP — ${entry.wins}W/${entry.losses}L (puuid ${entry.puuid})`)
  }

  return entries
}
