import { LolApi } from '../../src'

/**
 * DATA DRAGON — Seed match data.
 *
 * Riot ships 10 sample match-v4 payload files (ids 1..10) for testing without
 * burning real API quota. `Seed.matches(id)` returns `{ matches }` raw — no
 * key, no rate limits and no `{ response }` wrapper.
 */
export async function matchesSeedData () {
  // Seed data needs no key
  const api = new LolApi()

  // 1. Pick one of the 10 seed files (valid ids are 1..10)
  const id = 1

  // 2. Fetch it — the payload is wrapped in a `matches` array
  const { matches } = await api.Seed.matches(id)

  console.log(`Seed file ${id}: ${matches.length} matches`)
  const first = matches[0]
  if (first) {
    console.log(`First match: gameId ${first.gameId} (${first.gameMode}, queue ${first.queueId})`)
  }

  return matches
}
