import { LolApi } from '../../src'
import { config } from '../config/config'

/**
 * LOL-STATUS-V4 — Get the platform status for a region.
 *
 * Reports the server's supported locales plus any ongoing maintenances and
 * incidents (useful for surfacing "servers are down" messages to users).
 */
export async function statusV4Example () {
  const api = new LolApi()

  // Platform status is a platform endpoint, so it takes a platform `Regions` value
  const { response: status } = await api.StatusV4.get(config.region)

  console.log(`Region        : ${status.name} (${status.id})`)
  console.log(`Locales       : ${status.locales.join(', ')}`)
  console.log(`Maintenance   : ${status.maintenances.maintenance_status ?? 'none'}`)
  console.log(`Incident sev. : ${status.incidents.incident_severity ?? 'none'}`)

  return status
}
