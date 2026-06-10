import { LolApi } from '../../src'

/**
 * DATA DRAGON — Seasons (static).
 *
 * Returns the static season reference: each numeric `id` mapped to its season
 * label (e.g. `{ id: 0, season: "PRESEASON 3" }`). Useful for decoding the
 * `seasonId` found on matches. Served from the static CDN: no key.
 */
export async function seasonsDataDragon () {
  // Data Dragon needs no key
  const api = new LolApi()

  // 1. Fetch the static season table
  const seasons = await api.DataDragon.getSeasons()

  console.log(`Seasons defined: ${seasons.length}`)
  console.log(`Latest season  : ${seasons[seasons.length - 1]?.season}`)

  return seasons
}
