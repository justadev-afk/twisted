import { LolApi, RiotApi } from '../../../src'
import { config } from '../../config/config'

/**
 * DEPRECATED — MATCH-V4 (`/lol/match/v4/matches/{matchId}`).
 *
 * Match-V4 was replaced by Match-V5 (use `LolApi.MatchV5`). It is kept here
 * for reference: note that V4 keys games by a numeric `gameId`, whereas V5
 * uses string match ids. We resolve the account through the Riot Account API
 * (Summoner name lookup was removed) and read its match history.
 */
export async function matchExample () {
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

  // 2. List the match history for this account (V4 uses the encrypted accountId)
  const { response: listing } = await lolApi.Match.list(summoner.accountId, region)
  console.log(`Found ${listing.matches.length} matches (total ${listing.totalGames})`)

  // 3. Fetch the full details of the most recent game (V4 get takes a numeric gameId)
  const { gameId } = listing.matches[0]
  const { response: match } = await lolApi.Match.get(gameId, region)

  console.log(`Game ${match.gameId} | mode ${match.gameMode} | queue ${match.queueId}`)
  console.log(`Duration: ${Math.round(match.gameDuration / 60)} min | ${match.participants.length} players`)

  return match
}
