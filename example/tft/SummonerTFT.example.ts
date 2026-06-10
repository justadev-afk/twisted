import { RiotApi, TftApi } from '../../src'
import { configTft } from '../config/config'

/**
 * TFT-SUMMONER-V1 — Get a Teamfight Tactics summoner by PUUID.
 *
 * The summoner endpoint is platform-region based (e.g. NA1), so we resolve
 * the PUUID through the Account API and then look the summoner up on its
 * platform region.
 */
export async function getSummonerTft () {
  const riotApi = new RiotApi()
  const tftApi = new TftApi()

  // 1. Resolve the Riot ID (gameName#tagLine) into a PUUID
  const { response: account } = await riotApi.Account.getByRiotId(
    configTft.summonerName,
    configTft.tagLine,
    configTft.regionGroup
  )

  // 2. Fetch the TFT summoner on its platform region (NOT the region group)
  const { response: summoner } = await tftApi.Summoner.getByPUUID(account.puuid, configTft.region)

  console.log(`Summoner : ${account.gameName}#${account.tagLine}`)
  console.log(`Level    : ${summoner.summonerLevel}`)
  console.log(`Icon id  : ${summoner.profileIconId}`)

  return summoner
}
