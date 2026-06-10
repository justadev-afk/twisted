import { LolApi, RiotApi } from '../../../src'
import { config } from '../../config/config'

/**
 * DEPRECATED — MATCH-V4 timeline (`/lol/match/v4/timelines/by-match/{matchId}`).
 *
 * Replaced by Match-V5 `LolApi.MatchV5.timeline`. The timeline breaks a game
 * into fixed-interval frames (events + per-participant state), and V4 keys it
 * by the same numeric `gameId` used by the match listing.
 */
export async function matchTimeLineExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()
  const { region } = config

  // 1. Resolve the Riot ID into a PUUID, then load the summoner
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )
  const { response: summoner } = await lolApi.Summoner.getByPUUID(account.puuid, region)

  // 2. Find the most recent game id from the match listing
  const { response: listing } = await lolApi.Match.list(summoner.accountId, region)
  const { gameId } = listing.matches[0]

  // 3. Fetch the timeline for that game (V4 timeline takes the numeric gameId)
  const { response: timeline } = await lolApi.Match.timeline(gameId, region)

  console.log(`Timeline for game ${gameId}`)
  console.log(`Frames: ${timeline.frames.length} | interval: ${timeline.frameInterval}ms`)

  return timeline
}
