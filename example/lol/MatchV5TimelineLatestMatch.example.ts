import { LolApi, RiotApi } from '../../src'
import { config } from '../config/config'

/**
 * MATCH-V5 — Walk from a Riot ID to a match timeline.
 *
 * Summoner-V4 no longer accepts a name, so we resolve the PUUID through the
 * Account API and then chain the Match-V5 endpoints:
 *   list (match ids) -> get (match details) -> timeline (per-frame events).
 * Match-V5 is routed by region GROUP (AMERICAS / ASIA / EUROPE).
 */
export async function matchV5TimelineLatestMatchExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()

  // 1. Resolve the Riot ID (gameName#tagLine) into a PUUID
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )
  console.log(`Player    : ${account.gameName}#${account.tagLine}`)

  // 2. List the player's most recent ARAM matches (queue 450), routed by region group
  const { response: matchIds } = await lolApi.MatchV5.list(account.puuid, config.regionGroup, {
    queue: 450,
    count: 5
  })
  console.log(`Match ids : ${matchIds.length}`)

  const matchId = matchIds[0]
  if (!matchId) {
    console.log('No matches found for this player')
    return undefined
  }

  // 3. Fetch the match details for the most recent match
  const { response: match } = await lolApi.MatchV5.get(matchId, config.regionGroup)
  console.log(`Match     : ${match.metadata.matchId} (queue ${match.info.queueId}, ${match.info.gameDuration}s)`)

  // 4. Fetch the timeline (frames of per-participant state and events)
  const { response: timeline } = await lolApi.MatchV5.timeline(matchId, config.regionGroup)
  console.log(`Frames    : ${timeline.info.frames.length}`)

  return timeline
}
