import { TftApi, Constants } from '../../src'
import { configTft } from '../config/config'

/**
 * TFT-LEAGUE-V1 — List the ranked entries for a given tier + division.
 *
 * This returns a page of players sitting in the requested bracket
 * (e.g. DIAMOND I) on the given platform region.
 */
export async function TftLeagueByTierDivision () {
  const tftApi = new TftApi()

  // Page through the DIAMOND I ladder on the configured platform region.
  // Signature: getByTierDivision(region, tier, division, page = 1, queue = 'RANKED_TFT')
  const { response: entries } = await tftApi.League.getByTierDivision(
    configTft.region,
    Constants.Tiers.DIAMOND,
    Constants.Divisions.I
  )

  console.log(`Bracket: DIAMOND I (${configTft.region})`)
  console.log(`Entries: ${entries.length}`)

  // Show the top few players on this page by league points
  const top = [...entries].sort((a, b) => b.leaguePoints - a.leaguePoints).slice(0, 5)
  for (const entry of top) {
    console.log(`  ${entry.leaguePoints} LP - ${entry.wins}W/${entry.losses}L`)
  }

  return entries
}
