import { LolApi, RiotApi } from '../../src'
import { config } from '../config/config'

/**
 * SUMMONER-V4 — Get a summoner by PUUID.
 *
 * Summoner-V4 no longer accepts a name, so we first resolve the account's
 * PUUID through the Riot Account API (ACCOUNT-V1), then look the summoner up
 * on its platform region.
 */
export async function summonerByPUUIDExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()

  // 1. Resolve the Riot ID (gameName#tagLine) into a PUUID via ACCOUNT-V1
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )

  // 2. Fetch the summoner on its platform region using that PUUID
  const { response: summoner } = await lolApi.Summoner.getByPUUID(account.puuid, config.region)

  console.log(`Summoner    : ${account.gameName}#${account.tagLine}`)
  console.log(`PUUID       : ${summoner.puuid}`)
  console.log(`Level       : ${summoner.summonerLevel}`)
  console.log(`Profile icon: ${summoner.profileIconId}`)

  return summoner
}
