import { RiotApi, TftApi } from '../../src'
import { configTft } from '../config/config'

/**
 * TFT-MATCH-V1 — List a player's recent Teamfight Tactics match ids.
 *
 * TFT matches are routed by `RegionGroups` (AMERICAS / ASIA / EUROPE / SEA),
 * but the account still has to be resolved through the Account API first.
 */
export async function matchListTft () {
  const riotApi = new RiotApi()
  const tftApi = new TftApi()

  // 1. Resolve the Riot ID (gameName#tagLine) into a PUUID via the Account API
  const { response: account } = await riotApi.Account.getByRiotId(
    configTft.summonerName,
    configTft.tagLine,
    configTft.regionGroup
  )

  // 2. Fetch the match ids on the TFT routing region (a RegionGroups value)
  const { response: matchIds } = await tftApi.Match.list(account.puuid, configTft.tftRegion)

  console.log(`Player    : ${account.gameName}#${account.tagLine}`)
  console.log(`Match ids : ${matchIds.length} found`)
  console.log(`Most recent: ${matchIds[0] ?? 'no matches'}`)

  return matchIds
}
