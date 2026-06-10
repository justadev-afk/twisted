import { LolApi, RiotApi } from '../../../src'
import { config } from '../../config/config'

/**
 * DEPRECATED — SPECTATOR-V4 active game (`/lol/spectator/v4/active-games/by-summoner/{summonerId}`).
 *
 * Use `LolApi.SpectatorV5.activeGame(puuid, region)` instead. The V4 endpoint
 * looked a player up by their encrypted summoner id and returned their live
 * game — or nothing when the player is not currently in a game.
 */
export async function spectatorSummonerExample () {
  const riotApi = new RiotApi()
  const lolApi = new LolApi()
  const { region } = config

  // 1. Resolve the Riot ID into a PUUID, then load the summoner (for its id)
  const { response: account } = await riotApi.Account.getByRiotId(
    config.summonerName,
    config.tagLine,
    config.regionGroup
  )
  const { response: summoner } = await lolApi.Summoner.getByPUUID(account.puuid, region)

  // 2. Look up the live game by the encrypted summoner id.
  //    The deprecated wrapper returns a "not available" object when not in a game;
  //    a found game is returned wrapped as { response, rateLimits }.
  try {
    const result = await lolApi.Spectator.activeGame(summoner.id, region)

    if ('response' in result) {
      const game = result.response
      console.log(`${account.gameName} is in game ${game.gameId} (mode ${game.gameMode})`)
      console.log(`Players: ${game.participants.length} | live for ${game.gameLength}s`)
      return game
    }

    console.log(`${account.gameName} is not currently in a game (${result.message})`)
    return result
  } catch (e) {
    console.log('Could not fetch active game (player likely offline / not in game)')
    return null
  }
}
