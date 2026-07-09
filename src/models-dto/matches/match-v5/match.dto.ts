// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MatchV5DTOs {
  export interface MatchDto {
    metadata: MetadataDto;
    info: InfoDto;
  }

  export interface MetadataDto {
    /** Match data version. */
    dataVersion: string;

    /** Match id. */
    matchId: string;

    /** A list of participant PUUIDs */
    participants: string[];
  }

  export interface InfoDto {
    /** Refer to indicate if the game ended in termination. */
    endOfGameResult: string;

    /** Unix timestamp for when the game is created(i.e., the loading screen). */
    gameCreation: number;

    /** Game length in milliseconds. */
    gameDuration: number;

    /** Unix timestamp for when match ends on the game server. This timestamp can occasionally be significantly longer than when the match "ends". The most reliable way of determining the timestamp for the end of the match would be to add the max time played of any participant to the gameStartTimestamp. This field was added to match-v5 in patch 11.20 on Oct 5th, 2021. */
    gameEndTimestamp: number;

    gameId: number;

    /** Refer to the Game Constants documentation. */
    gameMode: string;
    gameName: string;

    /** Unix timestamp for when match actually starts. */
    gameStartTimestamp: number;
    gameType: string;

    /** The first two parts can be used to determine the patch a game was played on. */
    gameVersion: string;

    /** Refer to the Game Constants documentation. */
    mapId: number;
    participants: ParticipantDto[];

    /** Platform where the match was played. */
    platformId: string;

    /** Refer to the Game Constants documentation. */
    queueId: number;

    teams: TeamDto[];

    /** Tournament code used to generate the match. */
    tournamentCode: string;
  }

  export interface ParticipantDto {
    assists: number;
    baitPings: number;
    baronKills: number;
    basicPings: number;
    bountyLevel: number;
    challenges: ChallengesDto;
    champExperience: number;
    champLevel: number;
    championId: number;
    championName: string;

    /** This field is currently only utilized for Kayn's transformations. (Legal values: 0 - None, 1 - Slayer, 2 - Assassin) */
    championTransform: number;

    allInPings: number;
    assistMePings: number;
    commandPings: number;
    retreatPings:                   number;
    visionClearedPings:             number;
    causedGameEndFromIGNBSurrender: boolean;
    consumablesPurchased: number;
    damageDealtToBuildings: number;
    damageDealtToEpicMonsters: number;
    damageDealtToObjectives: number;
    damageDealtToTurrets: number;
    damageSelfMitigated: number;
    dangerPings: number;
    deaths: number;
    detectorWardsPlaced: number;
    doubleKills: number;
    dragonKills: number;
    eligibleForProgression: boolean;
    enemyMissingPings: number;
    enemyVisionPings: number;
    firstBloodAssist: boolean;
    firstBloodKill: boolean;
    firstTowerAssist: boolean;
    firstTowerKill: boolean;
    gameEndedInEarlySurrender: boolean;
    gameEndedInIGNBSurrender: boolean;
    gameEndedInSurrender: boolean;
    getBackPings: number;
    goldEarned: number;
    goldSpent: number;
    holdPings: number;

    /** Both individualPosition and teamPosition are computed by the game server and are different versions of the most likely position played by a player. The individualPosition is the best guess for which position the player actually played in isolation of anything else. The teamPosition is the best guess for which position the player actually played if we add the constraint that each team must have one top player, one jungle, one middle, etc. Generally the recommendation is to use the teamPosition field over the individualPosition field. */
    individualPosition: Position;

    inhibitorKills: number;
    inhibitorTakedowns: number;
    inhibitorsLost: number;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
    itemsPurchased: number;
    killingSprees: number;
    kills: number;
    lane: Lane;
    largestCriticalStrike: number;
    largestKillingSpree: number;
    largestMultiKill: number;
    longestTimeSpentLiving: number;
    magicDamageDealt: number;
    magicDamageDealtToChampions: number;
    magicDamageTaken: number;

    /** New interface */
    missions: MissionsDto;

    needVisionPings: number;
    neutralMinionsKilled: number;
    nexusKills: number;
    nexusLost: number;
    nexusTakedowns: number;
    objectivesStolen: number;
    objectivesStolenAssists: number;
    onMyWayPings: number;
    participantId: number;
    pentaKills: number;
    perks: PerksDto;
    physicalDamageDealt: number;
    physicalDamageDealtToChampions: number;
    physicalDamageTaken: number;
    positionAssignedByMatchmaking: string;
    profileIcon: number;
    pushPings: number;
    puuid: string;
    quadraKills: number;
    riotIdName?: string;
    riotIdGameName?: string;
    riotIdTagline: string;
    role: Role;
    selectedRolePreferences: string;
    sightWardsBoughtInGame: number;
    spell1Casts: number;
    spell2Casts: number;
    spell3Casts: number;
    spell4Casts: number;
    summoner1Casts: number;
    summoner1Id: number;
    summoner2Casts: number;
    summoner2Id: number;
    /** @deprecated use puuid instead */
    summonerId: string;
    summonerLevel: number;
    /** @deprecated use riotIdGameName and riotIdTagline instead */
    summonerName: string;
    teamEarlySurrendered: boolean;
    teamId: number;
    teamIGNBSurrendered: boolean;

    /** Both individualPosition and teamPosition are computed by the game server and are different versions of the most likely position played by a player. The individualPosition is the best guess for which position the player actually played in isolation of anything else. The teamPosition is the best guess for which position the player actually played if we add the constraint that each team must have one top player, one jungle, one middle, etc. Generally the recommendation is to use the teamPosition field over the individualPosition field. */
    teamPosition: Position;

    timeCCingOthers: number;
    timePlayed: number;
    totalAllyJungleMinionsKilled: number;
    totalDamageDealt: number;
    totalDamageDealtToChampions: number;
    totalDamageShieldedOnTeammates: number;
    totalDamageTaken: number;
    totalEnemyJungleMinionsKilled: number;
    totalHeal: number;
    totalHealsOnTeammates: number;
    totalMinionsKilled: number;
    totalTimeCCDealt: number;
    totalTimeSpentDead: number;
    totalUnitsHealed: number;
    tripleKills: number;
    trueDamageDealt: number;
    trueDamageDealtToChampions: number;
    trueDamageTaken: number;
    turretKills: number;
    turretTakedowns: number;
    turretsLost: number;
    unrealKills: number;
    visionScore: number;
    visionWardsBoughtInGame: number;
    wardsKilled: number;
    wardsPlaced: number;
    wasSevereTransgressor: boolean;
    wasPremadeWithIGNBGameEndCauser: boolean;
    wasPremadeWithSevereTransgressor: boolean;
    win: boolean;

    /** Arena only values (is otherwise set to 0)*/
    PlayerScore0:                   number;
    PlayerScore1:                   number;
    PlayerScore2:                   number;
    PlayerScore3:                   number;
    PlayerScore4:                   number;
    PlayerScore5:                   number;
    PlayerScore6:                   number;
    PlayerScore7:                   number;
    PlayerScore8:                   number;
    PlayerScore9:                   number;
    PlayerScore10:                  number;
    PlayerScore11:                  number;
    playerAugment1:                 number;
    playerAugment2:                 number;
    playerAugment3:                 number;
    playerAugment4:                 number;
    playerAugment5:                 number;
    playerAugment6:                 number;
    placement: number;
    subteamPlacement:               number;

    
  }

  export interface ChallengesDto {
    "12AssistStreakCount": number;
    HealFromMapSources: number;
    InfernalScalePickup: number;
    SWARM_DefeatAatrox: number;
    SWARM_DefeatBriar: number;
    SWARM_DefeatMiniBosses: number;
    SWARM_EvolveWeapon: number;
    SWARM_Have3Passives: number;
    SWARM_KillEnemy: number;
    SWARM_PickupGold: number;
    SWARM_ReachLevel50: number;
    SWARM_Survive15Min: number;
    SWARM_WinWith5EvolvedWeapons: number;
    abilityUses: number;
    acesBefore15Minutes: number;
    alliedJungleMonsterKills: number;
    baronBuffGoldAdvantageOverThreshold?: number;
    baronTakedowns: number;
    blastConeOppositeOpponentCount: number;
    bountyGold: number;
    buffsStolen: number;
    completeSupportQuestInTime: number;
    controlWardTimeCoverageInRiverOrEnemyHalf?: number;
    controlWardsPlaced: number;
    damagePerMinute: number;
    damageTakenOnTeamPercentage: number;
    dancedWithRiftHerald: number;
    deathsByEnemyChamps: number;
    dodgeSkillShotsSmallWindow: number;
    doubleAces: number;
    dragonTakedowns: number;
    earliestBaron?: number;
    earliestDragonTakedown?: number;
    earlyLaningPhaseGoldExpAdvantage?: number;
    effectiveHealAndShielding: number;
    elderDragonKillsWithOpposingSoul: number;
    elderDragonMultikills: number;
    enemyChampionImmobilizations: number;
    enemyJungleMonsterKills: number;
    epicMonsterKillsNearEnemyJungler: number;
    epicMonsterKillsWithin30SecondsOfSpawn: number;
    epicMonsterSteals: number;
    epicMonsterStolenWithoutSmite: number;
    firstTurretKilled: number;
    firstTurretKilledTime?: number;
    fistBumpParticipation: number;
    flawlessAces: number;
    fullTeamTakedown: number;
    gameLength: number;
    getTakedownsInAllLanesEarlyJungleAsLaner?: number;
    goldPerMinute: number;
    hadOpenNexus: number;
    highestCrowdControlScore?: number;
    immobilizeAndKillWithAlly: number;
    initialBuffCount: number;
    initialCrabCount: number;
    jungleCsBefore10Minutes: number;
    junglerTakedownsNearDamagedEpicMonster: number;
    junglerKillsEarlyJungle?: number;
    kTurretsDestroyedBeforePlatesFall: number;
    kda: number;
    killAfterHiddenWithAlly: number;
    killParticipation?: number;
    killedChampTookFullTeamDamageSurvived: number;
    killingSprees: number;
    killsNearEnemyTurret: number;
    killsOnOtherLanesEarlyJungleAsLaner?: number;
    killsOnRecentlyHealedByAramPack: number;
    killsUnderOwnTurret: number;
    killsWithHelpFromEpicMonster: number;
    knockEnemyIntoTeamAndKill: number;
    landSkillShotsEarlyGame: number;
    laneMinionsFirst10Minutes: number;
    laningPhaseGoldExpAdvantage?: number;
    legendaryCount: number;
    legendaryItemUsed: number[];
    lostAnInhibitor: number;
    maxCsAdvantageOnLaneOpponent?: number;
    maxKillDeficit: number;
    maxLevelLeadLaneOpponent?: number;
    mejaisFullStackInTime: number;
    moreEnemyJungleThanOpponent: number;
    multiKillOneSpell: number;
    multiTurretRiftHeraldCount: number;
    multikills: number;
    multikillsAfterAggressiveFlash: number;
    mythicItemUsed: number;
    outerTurretExecutesBefore10Minutes: number;
    outnumberedKills: number;
    outnumberedNexusKill: number;
    perfectDragonSoulsTaken: number;
    perfectGame: number;
    pickKillWithAlly: number;
    playedChampSelectPosition?: number;
    poroExplosions: number;
    quickCleanse: number;
    quickFirstTurret: number;
    quickSoloKills: number;
    riftHeraldTakedowns: number;
    saveAllyFromDeath: number;
    scuttleCrabKills: number;
    shortestTimeToAceFromFirstTakedown?: number;
    skillshotsDodged: number;
    skillshotsHit: number;
    snowballsHit: number;
    soloBaronKills: number;
    soloKills: number;
    stealthWardsPlaced: number;
    survivedSingleDigitHpCount: number;
    survivedThreeImmobilizesInFight: number;
    takedownOnFirstTurret: number;
    takedowns: number;
    takedownsAfterGainingLevelAdvantage: number;
    takedownsBeforeJungleMinionSpawn: number;
    takedownsFirstXMinutes: number;
    takedownsInAlcove: number;
    takedownsInEnemyFountain: number;
    teamBaronKills: number;
    teamDamagePercentage: number;
    teamElderDragonKills: number;
    teamRiftHeraldKills: number;
    threeWardsOneSweeperCount: number;
    tookLargeDamageSurvived: number;
    turretPlatesTaken: number;
    turretTakedowns: number;
    turretsTakenWithRiftHerald: number;
    twentyMinionsIn3SecondsCount: number;
    twoWardsOneSweeperCount: number;
    unseenRecalls: number;
    visionScoreAdvantageLaneOpponent: number;
    visionScorePerMinute: number;
    voidMonsterKill: number;
    wardTakedowns: number;
    wardTakedownsBefore20M: number;
    wardsGuarded: number;
    fastestLegendary?: number;
    highestChampionDamage?: number;
    killsOnLanersEarlyJungleAsJungler?: number;
    highestWardKills?: number;
    soloTurretsLategame?: number;
    fasterSupportQuestCompletion?: number;
    hadAfkTeammate?: number;
    earliestElderDragon?: number;
  }

  /** Not sure what this is about */
  /** Value is only set in arena games**/
  export interface MissionsDto {
    playerScore0: number;
    playerScore1: number;
    playerScore2: number;
    playerScore3: number;
    playerScore4: number;
    playerScore5: number;
    playerScore6: number;
    playerScore7: number;
    playerScore8: number;
    playerScore9: number;
  }

  export interface PerksDto {
    statPerks: PerkStatsDto;
    styles: PerkStyleDto[];
  }

  export interface PerkStatsDto {
    defense: number;
    flex: number;
    offense: number;
  }

  export interface PerkStyleDto {
    description: Description;
    selections: PerkStyleSelectionDto[];
    style: number;
  }

  export interface PerkStyleSelectionDto {
    perk: number;
    var1: number;
    var2: number;
    var3: number;
  }

  export interface TeamDto {
    bans: BanDto[];
    objectives: ObjectivesDto;
    feats: FeatsDto;
    teamId: number;
    win: boolean;
  }

  export interface BanDto {
    championId: number;
    pickTurn: number;
  }

  export interface ObjectivesDto {
    baron: ObjectiveDto;
    champion: ObjectiveDto;
    dragon: ObjectiveDto;
    inhibitor: ObjectiveDto;
    riftHerald: ObjectiveDto;
    tower: ObjectiveDto;
    horde: ObjectiveDto;
    atakhan: ObjectiveDto;
  }

  export interface ObjectiveDto {
    first: boolean;
    kills: number;
  }

  export interface FeatsDto {
    EPIC_MONSTER_KILL: EpicMonsterKillDto;
    FIRST_BLOOD:       EpicMonsterKillDto;
    FIRST_TURRET:      EpicMonsterKillDto;
  }

  export interface EpicMonsterKillDto {
    featState: number
  }

  export type Description = "primaryStyle" | "subStyle";

  // TODO: Revisit the possible values once https://github.com/RiotGames/developer-relations/issues/541 is fixed
  export type Position = "" | "Invalid" | "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "UTILITY";
  export type Role = "SOLO" | "NONE" | "CARRY" | "SUPPORT";
  export type Lane = "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM";
}
