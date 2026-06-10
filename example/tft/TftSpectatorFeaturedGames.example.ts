import { TftApi } from '../../src'
import { configTft } from '../config/config'

/**
 * TFT-SPECTATOR-V5 — List the games Riot is currently featuring.
 *
 * Featured games are platform-region based and need no account: Riot returns
 * a curated list of in-progress games plus a suggested refresh interval.
 */
export async function spectatorTFTV5FeaturedGames () {
  const tftApi = new TftApi()

  // Fetch the featured games on the configured platform region
  const { response: featured } = await tftApi.SpectatorV5.featuredGames(configTft.region)

  console.log(`Featured games  : ${featured.gameList.length}`)
  console.log(`Refresh interval: ${featured.clientRefreshInterval}s`)
  for (const game of featured.gameList) {
    console.log(`  game ${game.gameId} - ${game.participants.length} players (queue ${game.gameQueueConfigId})`)
  }

  return featured
}
