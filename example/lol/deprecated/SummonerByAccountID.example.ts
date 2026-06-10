import { LolApi, RiotApi } from '../../../src'
import { config } from '../../config/config'

/**
 * DEPRECATED-style lookup — SUMMONER-V4 by account id
 * (`/lol/summoner/v4/summoners/by-account/{accountId}`).
 *
 * The encrypted accountId is a legacy identifier (the modern key is the PUUID).
 * Since name lookup was removed, we first resolve the account through the Riot
 * Account API to obtain a PUUID, fetch the summoner to read its `accountId`,
 * then demonstrate the by-account lookup.
 */
export async function summonerByAccountIDExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()
  const { region } = config

  // 1. Resolve the Riot ID into a PUUID
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )

  // 2. Fetch the summoner by PUUID to obtain its encrypted accountId
  const { response: byPuuid } = await lolApi.Summoner.getByPUUID(account.puuid, region)

  // 3. Look the same summoner up by its accountId (the deprecated identifier)
  const { response: summoner } = await lolApi.Summoner.getByAccountID(byPuuid.accountId, region)

  console.log(`Summoner: ${account.gameName}#${account.tagLine}`)
  console.log(`Level   : ${summoner.summonerLevel} | accountId ${summoner.accountId}`)

  return summoner
}
