import { LolApi, Constants } from '../../../src'

/**
 * DEPRECATED — SPECTATOR-V4 featured games.
 *
 * Use `LolApi.SpectatorV5.featuredGames` instead. This returns a small list
 * of currently live games that Riot is highlighting for the given platform
 * region, plus the suggested refresh interval.
 */
export async function spectatorFeaturedGames () {
  const lolApi = new LolApi()

  // 1. Fetch the featured (live) games for a platform region
  const { response: featured } = await lolApi.Spectator.featuredGames(Constants.Regions.LAT_NORTH)

  console.log(`Featured games: ${featured.gameList.length}`)
  console.log(`Refresh in    : ${featured.clientRefreshInterval}s`)

  const first = featured.gameList[0]
  if (first) {
    console.log(`First game: id ${first.gameId} | mode ${first.gameMode} | ${first.participants.length} players`)
  }

  return featured
}
