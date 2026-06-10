import { LolApi, RiotApi } from '../../src'
import { config } from '../config/config'

/**
 * SPECTATOR-V5 — Get the active (live) game for a player by PUUID.
 *
 * We resolve the account's PUUID through the Account API, then ask the
 * spectator endpoint for the game they are currently in. When the player is
 * NOT in a game the endpoint returns 404, so the call is wrapped in try/catch.
 */
export async function spectatorV5SummonerExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()

  // 1. Resolve the Riot ID (gameName#tagLine) into a PUUID
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )

  // 2. Ask for the live game — this 404s when the player is not currently playing
  try {
    const { response: game } = await lolApi.SpectatorV5.activeGame(account.puuid, config.region)

    console.log(`${account.gameName}#${account.tagLine} is in a live game`)
    console.log(`Game id    : ${game.gameId}`)
    console.log(`Game mode  : ${game.gameMode}`)
    console.log(`Players    : ${game.participants.length}`)

    return game
  } catch (e) {
    console.log(`${account.gameName}#${account.tagLine} is not currently in a game`)
    return undefined
  }
}
