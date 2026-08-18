import { LolApi } from '../../src'

/**
 * DATA DRAGON — Item list.
 *
 * `getItemList()` returns every item of the latest patch, keyed by item id
 * under `data`, plus the store `tree` and the mutually exclusive `groups`.
 * Raw CDN data: no key.
 */
export async function getItemListDataDragon () {
  // Data Dragon needs no key
  const api = new LolApi()

  // 1. Fetch the full item catalog for the latest patch
  const itemList = await api.DataDragon.getItemList()

  // 2. `data` is an object keyed by item id (e.g. "1001", "3078", ...)
  const ids = Object.keys(itemList.data)

  console.log(`Patch     : ${itemList.version}`)
  console.log(`Items     : ${ids.length}`)
  console.log(`First few : ${ids.slice(0, 5).map((id) => itemList.data[id].name).join(', ')}`)

  return itemList
}
