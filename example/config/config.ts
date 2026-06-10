import { Constants } from '../../src'
import { Regions, RegionGroups, AccountAPIRegionGroups } from '../../src/constants'
import { Levels } from '../../src/constants/levels'

/**
 * Shared configuration used across the examples.
 *
 * Riot IDs are made of a `gameName` + `tagLine` (the value after the `#`),
 * e.g. `Thebausffs#COOL`.
 *
 * Three different "region" concepts show up in the Riot API:
 *  - `Regions`                (platform routing, e.g. `EUW1`, `KR`, `NA1`) — most LoL/TFT endpoints.
 *  - `RegionGroups`           (`AMERICAS` | `ASIA` | `EUROPE` | `SEA`)    — Match-V5 / TFT-Match.
 *  - `AccountAPIRegionGroups` (`RegionGroups` without `SEA`)              — the Account-V1 API.
 */
interface ExampleAccount {
  /** Riot ID game name (the part before the `#`). */
  summonerName: string
  /** Riot ID tag line (the part after the `#`). */
  tagLine: string
  /** Platform region for LoL/TFT platform endpoints. */
  region: Regions
  /** Routing value for the Account-V1 API (americas / asia / europe). */
  regionGroup: AccountAPIRegionGroups
}

export const config: ExampleAccount = {
  summonerName: 'Thebausffs',
  tagLine: 'COOL',
  region: Constants.Regions.EU_WEST,
  regionGroup: Constants.RegionGroups.EUROPE
}

interface ExampleTftAccount extends ExampleAccount {
  /** Routing value for the TFT Match-V1 API. */
  tftRegion: RegionGroups
}

export const configTft: ExampleTftAccount = {
  summonerName: 'Meinya',
  tagLine: 'NA1',
  region: Constants.Regions.AMERICA_NORTH,
  regionGroup: Constants.RegionGroups.AMERICAS,
  tftRegion: Constants.RegionGroups.AMERICAS
}

interface ExampleChallengesAccount extends ExampleAccount {
  /** A challenge id (see the Challenges-V1 config endpoint). */
  challengeId: number
  /** Tier used when querying challenge leaderboards. */
  level: Levels
}

// Used for challengeID
export const configChallenges: ExampleChallengesAccount = {
  summonerName: 'Night Owl',
  tagLine: 'ryi',
  region: Constants.Regions.AMERICA_NORTH,
  regionGroup: Constants.RegionGroups.AMERICAS,
  challengeId: 101106, // ARAM Eradication
  level: Levels.CHALLENGER
}
