import { TftApi } from '../../src'

/**
 * TFT STATIC FILES — Local Teamfight Tactics game data.
 *
 * Unlike every other endpoint, `StaticFiles` reads bundled JSON shipped with
 * the library. The methods are SYNCHRONOUS (no `await`, no API key, no rate
 * limits): champions, hexes, items and traits for the current set.
 */
export function staticFilesExample () {
  const staticFiles = new TftApi().StaticFiles

  // All four readers return arrays straight from local JSON
  const champions = staticFiles.Champions()
  const hexes = staticFiles.Hexes()
  const items = staticFiles.Items()
  const traits = staticFiles.Traits()

  console.log(`Champions: ${champions.length}`)
  console.log(`Hexes    : ${hexes.length}`)
  console.log(`Items    : ${items.length}`)
  console.log(`Traits   : ${traits.length}`)

  // Peek at one champion to show the shape of the data
  if (champions[0]) {
    console.log(`Example champion: ${champions[0].champion} (cost ${champions[0].cost})`)
  }

  return { champions, hexes, items, traits }
}
