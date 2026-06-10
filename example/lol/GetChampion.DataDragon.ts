import { LolApi, Constants } from '../../src'

/**
 * DATA DRAGON — Single champion details.
 *
 * Passing a `Constants.Champions` value returns the *full* champion blob for
 * that one champion: lore, spells, passive, skins and base stats. Raw CDN
 * data: no key, no rate limits and no `{ response }` wrapper.
 */
export async function getChampionDetailsDataDragon () {
  // Data Dragon needs no key
  const api = new LolApi()

  // 1. Fetch the detailed payload for a single champion (Twisted Fate here)
  const champion = await api.DataDragon.getChampion(Constants.Champions.TWISTED_FATE)

  console.log(`Champion: ${champion.name} — ${champion.title}`)
  console.log(`Tags    : ${champion.tags.join(', ')}`)
  console.log(`Spells  : ${champion.spells.map((s) => s.name).join(', ')}`)
  console.log(`Skins   : ${champion.skins.length}`)

  return champion
}
