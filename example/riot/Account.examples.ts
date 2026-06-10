import { RiotApi, Constants } from '../../src'
import { config } from '../config/config'

/**
 * ACCOUNT-V1 — Look up a Riot account.
 *
 * The Riot Account API is the entry point for almost everything else: it maps a
 * human-friendly Riot ID (gameName#tagLine) to the stable PUUID used by every
 * other endpoint. Here we resolve an account both ways: by Riot ID and by PUUID.
 *
 * Account endpoints are routed by region GROUP (AMERICAS / ASIA / EUROPE),
 * never by platform region.
 */
export async function accountV1Examples () {
  const riotApi = new RiotApi()

  // 1. Resolve the Riot ID (gameName#tagLine) into an account (and its PUUID)
  const { response: byRiotId } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )
  console.log(`Riot ID : ${byRiotId.gameName}#${byRiotId.tagLine}`)
  console.log(`PUUID   : ${byRiotId.puuid}`)

  // 2. Reverse the lookup: fetch the same account from its PUUID
  const { response: byPuuid } = await riotApi.Account.getByPUUID(
    byRiotId.puuid,
    config.regionGroup
  )
  console.log(`Round-trip Riot ID: ${byPuuid.gameName}#${byPuuid.tagLine}`)

  return byPuuid
}
