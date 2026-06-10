import { LolApi } from '../../src'

/**
 * DATA DRAGON — Champion list.
 *
 * Calling `getChampion()` with no argument returns the *summary* list of all
 * champions for the latest patch, keyed by champion id under `data`. Each
 * entry is a lightweight blurb (no spells/skins). Raw CDN data: no key.
 */
export async function getChampionListDataDragon () {
  // Data Dragon needs no key
  const api = new LolApi()

  // 1. Fetch the full champion roster for the latest patch
  const championList = await api.DataDragon.getChampion()

  // 2. `data` is an object keyed by champion id (e.g. "Aatrox", "Ahri", ...)
  const ids = Object.keys(championList.data)

  console.log(`Patch     : ${championList.version}`)
  console.log(`Champions : ${ids.length}`)
  console.log(`First few : ${ids.slice(0, 5).join(', ')}`)

  return championList
}
