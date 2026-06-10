import { LolApi } from '../../src'
import { config } from '../config/config'

/**
 * CLASH-V1 — Fetch a single Clash tournament by its id.
 *
 * There is no fixed tournament id to demo, so we first list the active
 * tournaments and reuse the first one's id. Clash is often idle, so we guard
 * against an empty list. This endpoint uses the platform `Regions` value.
 */
export async function clashTournamentById () {
  const lolApi = new LolApi()

  // 1. List the active Clash tournaments to discover a valid id
  const { response: tournaments } = await lolApi.Clash.getTournaments(config.region)

  // 2. Bail out gracefully when no tournament is currently scheduled
  if (tournaments.length === 0) {
    console.log(`No active Clash tournaments on ${config.region} right now.`)
    return null
  }

  // 3. Reuse the first tournament's id to fetch its full detail
  const [{ id }] = tournaments
  const { response: tournament } = await lolApi.Clash.getTournamentById(id, config.region)

  console.log(`Tournament #${tournament.id} — ${tournament.nameKey}`)
  console.log(`Theme   : ${tournament.themeId}`)
  console.log(`Schedule: ${tournament.schedule.length} phase(s)`)

  return tournament
}
