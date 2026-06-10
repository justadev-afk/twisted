import { LolApi } from '../../src'

/**
 * DATA DRAGON — Versions.
 *
 * Returns the full list of Data Dragon versions, newest first. The first
 * entry (`[0]`) is the latest patch and is what every other Data Dragon
 * asset is fetched against. Raw CDN data: no key, no rate limits.
 */
export async function versionsDataDragon () {
  // Data Dragon needs no key
  const api = new LolApi()

  // 1. Fetch every published Data Dragon version (descending order)
  const versions = await api.DataDragon.getVersions()

  console.log(`Versions available: ${versions.length}`)
  console.log(`Latest patch      : ${versions[0]}`)

  return versions
}
