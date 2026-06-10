import { LolApi, RiotApi } from '../../src'
import { config } from '../config/config'

/**
 * CHAMPION-MASTERY-V4 — Get a player's total champion mastery score by PUUID.
 *
 * The mastery score is the sum of a player's individual champion mastery
 * levels. We resolve the account's PUUID first, then read the score.
 *
 * Note: `championsScore` returns the `ChampionsScoreDTO` directly (no
 * `{ response }` wrapper).
 */
export async function championsScoreExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()

  // 1. Resolve the Riot ID (gameName#tagLine) into a PUUID.
  //    getByRiotId takes (gameName, tagLine, accountRegionGroup).
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )

  // 2. Fetch the total mastery score on the player's platform region
  const score = await lolApi.Champion.championsScore(account.puuid, config.region)

  console.log(`Player        : ${account.gameName}#${account.tagLine}`)
  console.log(`Mastery score : ${score.score}`)

  return score
}
