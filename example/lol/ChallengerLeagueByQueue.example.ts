import { LolApi, Constants } from '../../src'
import { config } from '../config/config'

/**
 * LEAGUE-V4 — Get the Challenger league for a given ranked queue.
 *
 * Returns the single apex league for the region/queue, with every Challenger
 * player listed under `entries`.
 */
export async function challengerLeagueByQueueExample () {
  const lolApi = new LolApi()

  // Fetch the Challenger ladder for solo/duo queue on this region
  const { response: league } = await lolApi.League.getChallengerLeaguesByQueue(
    Constants.Queues.RANKED_SOLO_5x5,
    config.region
  )

  console.log(`Challenger league "${league.name}" (${league.queue})`)
  console.log(`Players: ${league.entries.length}`)

  // Highlight the highest-LP player in the ladder
  const top = [...league.entries].sort((a, b) => b.leaguePoints - a.leaguePoints)[0]
  if (top) {
    console.log(`Top player: ${top.leaguePoints} LP — ${top.wins}W/${top.losses}L`)
  }

  return league
}
