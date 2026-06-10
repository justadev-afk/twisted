import { LolApi } from '../../src'

/**
 * DATA DRAGON — Game modes (static).
 *
 * Returns the static game-mode reference: each `gameMode` code mapped to a
 * human description (e.g. CLASSIC -> "Classic Summoner's Rift and Twisted
 * Treeline games"). Served from the static CDN: no key, no rate limits.
 */
export async function gameModesDataDragon () {
  // Data Dragon needs no key
  const api = new LolApi()

  // 1. Fetch the static game-mode table
  const gameModes = await api.DataDragon.getGameModes()

  console.log(`Game modes defined: ${gameModes.length}`)
  console.log(`Codes             : ${gameModes.map((g) => g.gameMode).join(', ')}`)

  return gameModes
}
