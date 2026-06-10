import { LolApi, Constants } from '../../../src'

/**
 * DEPRECATED — LOL-STATUS-V3 (`/lol/status/v3/shard-data`).
 *
 * This shard-data endpoint has been removed by Riot in favour of
 * `lol-status-v4` (use `LolApi.StatusV4.get` instead). It returned the
 * platform name, hostname and the per-service status for a given region.
 */
export async function lolStatusExample () {
  const lolApi = new LolApi()

  // 1. Query the (deprecated) shard status for a platform region
  const { response: status } = await lolApi.Status.get(Constants.Regions.LAT_NORTH)

  console.log(`Platform : ${status.name} (${status.slug})`)
  console.log(`Hostname : ${status.hostname}`)
  console.log(`Locales  : ${status.locales.join(', ')}`)

  return status
}
