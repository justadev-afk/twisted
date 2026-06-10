import { LolApi } from '../../src'

/**
 * DATA DRAGON — Game types (static).
 *
 * Returns the static game-type reference: each `gametype` code mapped to a
 * human description (e.g. CUSTOM_GAME, MATCHED_GAME, TUTORIAL_GAME).
 * Served from the static CDN: no key, no rate limits.
 */
export async function gameTypessDataDragon () {
  // Data Dragon needs no key
  const api = new LolApi()

  // 1. Fetch the static game-type table
  const gameTypes = await api.DataDragon.getGameTypes()

  console.log(`Game types defined: ${gameTypes.length}`)
  console.log(`Codes             : ${gameTypes.map((g) => g.gametype).join(', ')}`)

  return gameTypes
}
