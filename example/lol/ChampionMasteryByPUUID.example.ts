import { LolApi, RiotApi } from '../../src'
import { config } from '../config/config'

/**
 * CHAMPION-MASTERY-V4 — Get all champion mastery entries for a player by PUUID.
 *
 * Mastery is keyed by PUUID, so we first resolve the account's PUUID through
 * the Riot Account API, then fetch every champion the player has points on.
 */
export async function championMasteryByPUUID () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()

  // 1. Resolve the Riot ID (gameName#tagLine) into a PUUID
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )

  // 2. Fetch every champion mastery entry on the player's platform region
  const { response: masteries } = await lolApi.Champion.masteryByPUUID(account.puuid, config.region)

  console.log(`Player        : ${account.gameName}#${account.tagLine}`)
  console.log(`Champions     : ${masteries.length}`)

  // 3. The API already returns the list sorted by championPoints (highest first)
  const top = masteries[0]
  if (top) {
    console.log(`Top champion  : id ${top.championId} (level ${top.championLevel}, ${top.championPoints} pts)`)
  }

  return masteries
}
