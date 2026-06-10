import { RiotApi, Constants } from '../../src'
import { config } from '../config/config'

/**
 * ACCOUNT-V1 — Get the active shard / region for a player and game.
 *
 * Given a PUUID and a game (LoL / TFT / LoR), this returns the platform region
 * where that player is currently active. Useful when you only know a Riot ID
 * but not which shard the account lives on.
 *
 * Like the rest of Account-V1, it is routed by region GROUP (AMERICAS / ASIA /
 * EUROPE), not by platform region.
 */
export async function accountRegionV1Examples () {
  const riotApi = new RiotApi()

  // 1. Resolve the Riot ID (gameName#tagLine) into a PUUID
  const { puuid } = (
    await riotApi.Account.getByRiotId(config.summonerName, config.tagLine, config.regionGroup)
  ).response

  // 2. Ask which region this PUUID is active in for League of Legends
  const { response: activeRegion } = await riotApi.Account.getActiveRegion(
    puuid,
    Constants.Games.LOL,
    config.regionGroup
  )

  console.log(`Account : ${config.summonerName}#${config.tagLine}`)
  console.log(`Game    : ${activeRegion.game}`)
  console.log(`Active region: ${activeRegion.region}`)

  return activeRegion
}
