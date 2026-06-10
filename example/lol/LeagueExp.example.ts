import { LolApi, Constants } from '../../src'
import { config } from '../config/config'

/**
 * LEAGUE-EXP-V4 — Experimental, paginated league entries for a given
 * queue / tier / division.
 *
 * Same data shape as LEAGUE-V4 entries, but this endpoint also returns the
 * apex tiers (MASTER / GRANDMASTER / CHALLENGER), which the classic entries
 * endpoint does not.
 */
export async function leagueExpExample () {
  const lolApi = new LolApi()

  // Query page 1 of every Bronze I solo-queue player on this region
  const { response: entries } = await lolApi.League.exp(
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
