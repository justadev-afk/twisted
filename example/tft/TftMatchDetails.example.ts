import { RiotApi, TftApi } from '../../src'
import { configTft } from '../config/config'

/**
 * TFT-MATCH-V1 — Get the full detail of a single Teamfight Tactics match.
 *
 * We resolve the account, grab its most recent match id, then fetch the
 * match info (participants, placements, set number, ...).
 */
export async function matchDetailsTft () {
  const riotApi = new RiotApi()
  const tftApi = new TftApi()

  // 1. Resolve the Riot ID into a PUUID
  const { response: account } = await riotApi.Account.getByRiotId(
    configTft.summonerName,
    configTft.tagLine,
    configTft.regionGroup
  )

  // 2. List the match ids and pick the most recent one
  const { response: matchIds } = await tftApi.Match.list(account.puuid, configTft.tftRegion)
  const [matchId] = matchIds
  if (!matchId) {
    console.log('No TFT matches found for this player.')
    return undefined
  }

  // 3. Fetch the full match detail (same RegionGroups routing as the list)
  const { response: match } = await tftApi.Match.get(matchId, configTft.tftRegion)

  console.log(`Match id     : ${match.metadata.match_id}`)
  console.log(`Set number   : ${match.info.tft_set_number}`)
  console.log(`Game length  : ${Math.round(match.info.game_length)}s`)
  console.log(`Participants : ${match.info.participants.length}`)

  // Find our player's row to show their placement
  const me = match.info.participants.find(p => p.puuid === account.puuid)
  if (me) {
    console.log(`Your placement: #${me.placement} (level ${me.level})`)
  }

  return match
}
