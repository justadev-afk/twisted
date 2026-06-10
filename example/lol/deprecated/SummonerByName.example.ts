import { LolApi, RiotApi } from '../../../src'
import { config } from '../../config/config'

/**
 * DEPRECATED — SUMMONER-V4 by name (`/lol/summoner/v4/summoners/by-name/{name}`).
 *
 * Riot REMOVED summoner-name lookup: `LolApi.Summoner.getByName` no longer
 * exists. The modern replacement is to resolve the Riot ID (gameName#tagLine)
 * to a PUUID through the Account API, then fetch the summoner by PUUID. This
 * example demonstrates that replacement flow.
 */
export async function summonerByNameExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()

  // 1. Resolve the Riot ID (gameName#tagLine) into a PUUID via the Account API
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )

  // 2. Fetch the summoner on its platform region using the PUUID
  const { response: summoner } = await lolApi.Summoner.getByPUUID(account.puuid, config.region)

  console.log(`Summoner: ${account.gameName}#${account.tagLine}`)
  console.log(`Level   : ${summoner.summonerLevel}`)

  return summoner
}
