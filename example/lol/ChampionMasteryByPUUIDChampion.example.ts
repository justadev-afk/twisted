import { LolApi, RiotApi } from '../../src'
import { config } from '../config/config'

/**
 * CHAMPION-MASTERY-V4 — Get a single champion's mastery for a player by PUUID.
 *
 * Like the full-list endpoint, this is keyed by PUUID, so we resolve the
 * account first and then ask for one specific champion id (here: Annie, id 1).
 */
export async function championMasteryByPUUIDByChampion () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()

  const championId = 1 // Annie

  // 1. Resolve the Riot ID (gameName#tagLine) into a PUUID
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )

  // 2. Fetch this single champion's mastery on the player's platform region
  const { response: mastery } = await lolApi.Champion.masteryByPUUIDChampion(
    account.puuid,
    championId,
    config.region
  )

  console.log(`Player            : ${account.gameName}#${account.tagLine}`)
  console.log(`Champion id       : ${mastery.championId}`)
  console.log(`Mastery level     : ${mastery.championLevel}`)
  console.log(`Mastery points    : ${mastery.championPoints}`)
  console.log(`Until next level  : ${mastery.championPointsUntilNextLevel}`)

  return mastery
}
