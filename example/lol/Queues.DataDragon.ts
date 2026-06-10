import { LolApi } from '../../src'

/**
 * DATA DRAGON — Queues (static).
 *
 * Returns the static queue reference: every `queueId` mapped to the map it is
 * played on plus a human description (e.g. 420 -> "5v5 Ranked Solo games").
 * Served from the static CDN: no key, no rate limits.
 */
export async function queuesDataDragon () {
  // Data Dragon needs no key
  const api = new LolApi()

  // 1. Fetch the static queue table
  const queues = await api.DataDragon.getQueues()

  console.log(`Queues defined: ${queues.length}`)
  const ranked = queues.find((q) => q.queueId === 420)
  if (ranked) {
    console.log(`Queue 420     : ${ranked.description ?? 'n/a'} on ${ranked.map}`)
  }

  return queues
}
