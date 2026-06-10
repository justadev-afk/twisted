import { LolApi } from '../../src'

/**
 * DATA DRAGON — Runes Reforged (perks).
 *
 * Returns the rune trees (Precision, Domination, Sorcery, Resolve, Inspiration)
 * for the latest patch. Each tree exposes `slots`, each slot a list of runes.
 * Raw CDN data: no key, no rate limits and no `{ response }` wrapper.
 */
export async function runesReforgedDataDragon () {
  // Data Dragon needs no key
  const api = new LolApi()

  // 1. Fetch the rune trees (defaults to the latest patch + en_US locale)
  const trees = await api.DataDragon.getRunesReforged()

  console.log(`Rune trees: ${trees.length}`)
  trees.forEach((tree) => {
    const runeCount = tree.slots.reduce((total, slot) => total + slot.runes.length, 0)
    console.log(`  ${tree.name} (${tree.key}) — ${runeCount} runes`)
  })

  return trees
}
