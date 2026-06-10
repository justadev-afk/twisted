import { LolApi, RiotApi } from '../../../src'
import { config } from '../../config/config'
// NOTE: ThirdPartyCode is a sunset endpoint and is NOT wired into `LolApi`,
// so it is not reachable from the package barrel — we import the service class
// from its module to demonstrate the (now removed) call.
import { ThirdPartyCode } from '../../../src/apis/lol/thirdPartyCode/thirdPartyCode'

/**
 * DEPRECATED — THIRD-PARTY-CODE-V4
 * (`/lol/platform/v4/third-party-code/by-summoner/{summonerId}`).
 *
 * This endpoint was sunset by Riot on March 11th, 2024 and is no longer
 * available. It returned the verification code a player had set so third-party
 * apps could prove account ownership. It was keyed by the encrypted summoner
 * id, which we resolve via the Account API -> Summoner-by-PUUID flow.
 */
export async function thirdPartyExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()
  const thirdPartyApi = new ThirdPartyCode()
  const { region } = config

  // 1. Resolve the Riot ID into a PUUID, then load the summoner (for its id)
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )
  const { response: summoner } = await lolApi.Summoner.getByPUUID(account.puuid, region)

  // 2. Read the third-party verification code by summoner id.
  //    Wrapped in try/catch since the endpoint is sunset / commonly 404s.
  try {
    const { response: thirdParty } = await thirdPartyApi.get(summoner.id, region)
    console.log(`Verification code: ${thirdParty.code ?? '(none set / endpoint unavailable)'}`)
    return thirdParty
  } catch (e) {
    console.log('Third-party-code endpoint is no longer available (sunset 2024-03-11)')
    return { code: null }
  }
}
