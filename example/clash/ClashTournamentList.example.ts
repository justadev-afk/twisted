import { LolApi } from '../../src'
import { config } from '../config/config'

/**
 * CLASH-V1 — List the active Clash tournaments for a platform region.
 *
 * Clash is a scheduled competitive mode, so the list is often empty when no
 * tournament is running. This endpoint uses the platform `Regions` value.
 */
export async function clashTournamentList () {
  const lolApi = new LolApi()

  // 1. Fetch every active/scheduled Clash tournament on the platform region
  const { response: tournaments } = await lolApi.Clash.getTournaments(config.region)

  console.log(`Active Clash tournaments on ${config.region}: ${tournaments.length}`)

  // 2. Print a short summary for each tournament (id + theme)
  for (const tournament of tournaments) {
    console.log(`#${tournament.id} — themeId ${tournament.themeId} (${tournament.nameKey})`)
  }

  return tournaments
}
