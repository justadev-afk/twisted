import { LolApi, RiotApi } from '../../../src'
import { config } from '../../config/config'

/**
 * DEPRECATED-style lookup — SUMMONER-V4 by summoner id
 * (`/lol/summoner/v4/summoners/{summonerId}`).
 *
 * The encrypted summoner id is a legacy identifier (the modern key is the
 * PUUID). Since name lookup was removed, we resolve the account through the
 * Riot Account API, fetch the summoner by PUUID to obtain its `id`, then
 * demonstrate the by-id lookup.
 */
export async function summonerByIdExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()
  const { region } = config

  // 1. Resolve the Riot ID into a PUUID (Account API uses a region GROUP)
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )

  // 2. Fetch the summoner by PUUID to obtain its encrypted summoner id
  const { response: byPuuid } = await lolApi.Summoner.getByPUUID(account.puuid, region)

  // 3. Look the same summoner up by its id (the deprecated identifier)
  const { response: summoner } = await lolApi.Summoner.getById(byPuuid.id, region)

  console.log(`Summoner: ${account.gameName}#${account.tagLine}`)
  console.log(`Level   : ${summoner.summonerLevel} | id ${summoner.id}`)

  return summoner
}
