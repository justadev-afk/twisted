import { LolApi, RiotApi } from '../../src'
import { configChallenges } from '../config/config'

/**
 * LOL-CHALLENGES-V1 — Explore the Challenges system.
 *
 * Challenges are achievement-style goals with levels (IRON … CHALLENGER) and
 * leaderboards. This example walks the main read endpoints:
 *   - PlayerChallenges    : a single player's progress (needs a PUUID)
 *   - Leaderboards        : the top players for one challenge at a level
 *   - Configs             : the static config for every challenge
 *   - ChallengeConfig     : the static config for one challenge
 *   - Percentiles         : value distribution across ALL challenges
 *   - ChallengePercentiles: value distribution for one challenge
 */
export async function challengesV1Example () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()

  // 1. Resolve the Riot ID into a PUUID (PlayerChallenges is keyed by PUUID)
  const { response: account } = await riotApi.Account.getByRiotId(
    configChallenges.summonerName,
    configChallenges.tagLine,
    configChallenges.regionGroup
  )

  // 2. The player's own challenge progress and summed points
  const { response: playerChallenges } = await lolApi.Challenges.PlayerChallenges(
    account.puuid,
    configChallenges.region
  )
  console.log(`${account.gameName}#${account.tagLine} total points: ${playerChallenges.totalPoints.current}/${playerChallenges.totalPoints.max} (${playerChallenges.totalPoints.level})`)

  // 3. Top 5 players for our example challenge at the configured level
  const { response: leaderboards } = await lolApi.Challenges.Leaderboards(
    configChallenges.challengeId,
    configChallenges.level,
    configChallenges.region,
    { limit: 5 }
  )
  console.log(`Leaderboard entries for challenge ${configChallenges.challengeId}: ${leaderboards.length}`)

  // 4. Static config for every challenge on this region
  const { response: configs } = await lolApi.Challenges.Configs(configChallenges.region)
  console.log(`Total challenges configured: ${configs.length}`)

  // 5. Static config for just our example challenge
  const { response: challengeConfig } = await lolApi.Challenges.ChallengeConfig(
    configChallenges.challengeId,
    configChallenges.region
  )
  console.log(`Challenge ${challengeConfig.id} has leaderboard: ${challengeConfig.leaderboard}`)

  // 6. Value distribution across ALL challenges, then narrowed to our challenge
  const { response: percentiles } = await lolApi.Challenges.Percentiles(configChallenges.region)
  console.log(`Percentile data available for ${Object.keys(percentiles).length} challenges`)

  const { response: challengePercentiles } = await lolApi.Challenges.ChallengePercentiles(
    configChallenges.challengeId,
    configChallenges.region
  )
  console.log(`Levels with a percentile for challenge ${configChallenges.challengeId}: ${Object.keys(challengePercentiles).join(', ')}`)

  return playerChallenges
}
