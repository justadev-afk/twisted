import { LolApi } from '../../src'
import { config } from '../config/config'

/** Shape of the CHAMPION-V3 rotation payload (the call itself is untyped on the wire). */
interface ChampionRotation {
  freeChampionIds: number[]
  freeChampionIdsForNewPlayers: number[]
  maxNewPlayerLevel: number[]
}

/**
 * CHAMPION-V3 — Get the current free champion rotation.
 *
 * Returns the champions that are free-to-play this week (for all players and
 * for players who have not yet reached level 11), keyed by numeric champion id.
 */
export async function championRotationExample () {
  const api = new LolApi()

  // Champion rotation is a platform endpoint, so it takes a platform `Regions` value.
  // `rotation()` is untyped on the wire, so we annotate the expected DTO here.
  const { response } = await api.Champion.rotation(config.region)
  const rotation = response as ChampionRotation

  console.log(`Free champions this week    : ${rotation.freeChampionIds.length}`)
  console.log(`Free for new players (<11)  : ${rotation.freeChampionIdsForNewPlayers.length}`)
  console.log(`Max new player levels       : ${rotation.maxNewPlayerLevel.join(', ')}`)

  return rotation
}
