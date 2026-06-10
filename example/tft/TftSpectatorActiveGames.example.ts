import { RiotApi, TftApi } from '../../src'
import { configTft } from '../config/config'

/**
 * TFT-SPECTATOR-V5 — Get the live game a player is currently in.
 *
 * This 404s when the player is not in a game, so the call is wrapped in a
 * try/catch. The active-game endpoint is platform-region based.
 */
export async function tftSpectatorActiveGames () {
  const riotApi = new RiotApi()
  const tftApi = new TftApi()

  // 1. Resolve the Riot ID into a PUUID
  const { response: account } = await riotApi.Account.getByRiotId(
    configTft.summonerName,
    configTft.tagLine,
    configTft.regionGroup
  )

  // 2. Look up the player's current game (404 if they are not in one)
  try {
    const { response: game } = await tftApi.SpectatorV5.activeGame(account.puuid, configTft.region)
    console.log(`${account.gameName}#${account.tagLine} is in game ${game.gameId}`)
    console.log(`Mode   : ${game.gameMode} (queue ${game.gameQueueConfigId})`)
    console.log(`Players: ${game.participants.length}`)
    return game
  } catch (e) {
    console.log(`${account.gameName}#${account.tagLine} is not currently in a TFT game.`)
    return undefined
  }
}
