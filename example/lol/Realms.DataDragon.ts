import { LolApi, Constants } from '../../src'

/**
 * DATA DRAGON — Realms.
 *
 * Returns the per-server Data Dragon realm config: the live data version,
 * the CDN base URL and the latest patch used for each asset family.
 * Raw CDN data, so no API key, no rate limits and no `{ response }` wrapper.
 */
export async function realmsDataDragon () {
  // Data Dragon needs no key — instantiate the client and read straight from the CDN
  const api = new LolApi()

  // 1. Fetch the realm config for a specific server (here North America)
  const realm = await api.DataDragon.getRealms(Constants.RealmServers.AMERICA_NORTH)

  console.log(`Data version : ${realm.v}`)
  console.log(`Default lang : ${realm.l}`)
  console.log(`CDN base     : ${realm.cdn}`)
  console.log(`Champion patch: ${realm.n.champion}`)

  return realm
}
