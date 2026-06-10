import { LolApi } from '../../src'

/**
 * DATA DRAGON — Maps (static).
 *
 * Returns the static map reference: each `mapId` mapped to its name
 * (e.g. 11 -> "Summoner's Rift", 12 -> "Howling Abyss"). Useful for decoding
 * the `mapId` on matches. Served from the static CDN: no key.
 */
export async function mapsDataDragon () {
  // Data Dragon needs no key
  const api = new LolApi()

  // 1. Fetch the static map table
  const maps = await api.DataDragon.getMaps()

  console.log(`Maps defined: ${maps.length}`)
  maps.forEach((m) => console.log(`  ${m.mapId} -> ${m.mapName}`))

  return maps
}
