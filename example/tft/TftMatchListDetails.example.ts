import { RiotApi, TftApi } from '../../src'
import { configTft } from '../config/config'

/**
 * TFT-MATCH-V1 — List a player's recent matches WITH their full detail.
 *
 * `listWithDetails` is a convenience helper: it lists the match ids and then
 * fetches each match, so you get an array of full match objects in one call.
 */
export async function matchListDetailsTft () {
  const riotApi = new RiotApi()
  const tftApi = new TftApi()

  // 1. Resolve the Riot ID into a PUUID
  const { response: account } = await riotApi.Account.getByRiotId(
    configTft.summonerName,
    configTft.tagLine,
    configTft.regionGroup
  )

  // 2. Fetch the recent matches already expanded to their full detail.
  //    Note: listWithDetails returns the match array DIRECTLY (no { response } wrapper).
  const matches = await tftApi.Match.listWithDetails(account.puuid, configTft.tftRegion)

  console.log(`Player        : ${account.gameName}#${account.tagLine}`)
  console.log(`Matches loaded: ${matches.length}`)

  // Summarise this player's placement in each loaded match
  for (const match of matches) {
    const me = match.info.participants.find(p => p.puuid === account.puuid)
    console.log(`  ${match.metadata.match_id} -> placement #${me?.placement ?? '?'}`)
  }

  return matches
}
