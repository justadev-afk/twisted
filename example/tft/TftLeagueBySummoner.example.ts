import { RiotApi, TftApi } from '../../src'
import { configTft } from '../config/config'

/**
 * TFT-LEAGUE-V1 — Get the ranked league entries for a player.
 *
 * We resolve the PUUID via the Account API and read the ranked entries with
 * `getByPUUID` (the non-deprecated counterpart of the summoner-id based call).
 * League entries are platform-region based, so we use `configTft.region`.
 */
export async function TftLeagueBySummoner () {
  const riotApi = new RiotApi()
  const tftApi = new TftApi()

  // 1. Resolve the Riot ID into a PUUID
  const { response: account } = await riotApi.Account.getByRiotId(
    configTft.summonerName,
    configTft.tagLine,
    configTft.regionGroup
  )

  // 2. Fetch every ranked TFT league entry for this PUUID on its platform region
  const { response: entries } = await tftApi.League.getByPUUID(account.puuid, configTft.region)

  console.log(`Player       : ${account.gameName}#${account.tagLine}`)
  console.log(`Ranked queues: ${entries.length}`)
  for (const entry of entries) {
    console.log(`  ${entry.queueType}: ${entry.tier} ${entry.rank} - ${entry.leaguePoints} LP (${entry.wins}W/${entry.losses}L)`)
  }

  return entries
}
