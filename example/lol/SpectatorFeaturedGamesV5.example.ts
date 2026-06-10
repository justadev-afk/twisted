import { LolApi } from '../../src'
import { config } from '../config/config'

/**
 * SPECTATOR-V5 — List the featured games currently being played on a platform.
 *
 * Riot picks a handful of live games (no key-specific player needed) that can
 * be spectated. Also returns the suggested polling interval.
 */
export async function spectatorV5FeaturedGames () {
  const api = new LolApi()

  // Featured games is a platform endpoint, so it takes a platform `Regions` value
  const { response: featured } = await api.SpectatorV5.featuredGames(config.region)

  console.log(`Featured games    : ${featured.gameList.length}`)
  console.log(`Refresh interval  : ${featured.clientRefreshInterval}s`)

  // Highlight the first featured game, if any
  const first = featured.gameList[0]
  if (first) {
    console.log(`First game        : ${first.gameMode} on map ${first.mapId} (${first.participants.length} players)`)
  }

  return featured
}
