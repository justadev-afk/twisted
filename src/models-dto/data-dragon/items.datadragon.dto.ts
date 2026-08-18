export class ItemStatsDataDragon {
  FlatHPPoolMod?: number
  rFlatHPModPerLevel?: number
  FlatMPPoolMod?: number
  rFlatMPModPerLevel?: number
  PercentHPPoolMod?: number
  PercentMPPoolMod?: number
  FlatHPRegenMod?: number
  rFlatHPRegenModPerLevel?: number
  PercentHPRegenMod?: number
  FlatMPRegenMod?: number
  rFlatMPRegenModPerLevel?: number
  PercentMPRegenMod?: number
  FlatArmorMod?: number
  rFlatArmorModPerLevel?: number
  PercentArmorMod?: number
  rFlatArmorPenetrationMod?: number
  rFlatArmorPenetrationModPerLevel?: number
  rPercentArmorPenetrationMod?: number
  rPercentArmorPenetrationModPerLevel?: number
  FlatPhysicalDamageMod?: number
  rFlatPhysicalDamageModPerLevel?: number
  PercentPhysicalDamageMod?: number
  FlatMagicDamageMod?: number
  rFlatMagicDamageModPerLevel?: number
  PercentMagicDamageMod?: number
  FlatMovementSpeedMod?: number
  rFlatMovementSpeedModPerLevel?: number
  PercentMovementSpeedMod?: number
  rPercentMovementSpeedModPerLevel?: number
  FlatAttackSpeedMod?: number
  PercentAttackSpeedMod?: number
  rPercentAttackSpeedModPerLevel?: number
  rFlatDodgeMod?: number
  rFlatDodgeModPerLevel?: number
  PercentDodgeMod?: number
  FlatCritChanceMod?: number
  rFlatCritChanceModPerLevel?: number
  PercentCritChanceMod?: number
  FlatCritDamageMod?: number
  rFlatCritDamageModPerLevel?: number
  PercentCritDamageMod?: number
  FlatBlockMod?: number
  PercentBlockMod?: number
  FlatSpellBlockMod?: number
  rFlatSpellBlockModPerLevel?: number
  PercentSpellBlockMod?: number
  FlatEXPBonus?: number
  PercentEXPBonus?: number
  rPercentCooldownMod?: number
  rPercentCooldownModPerLevel?: number
  rFlatTimeDeadMod?: number
  rFlatTimeDeadModPerLevel?: number
  rPercentTimeDeadMod?: number
  rPercentTimeDeadModPerLevel?: number
  rFlatGoldPer10Mod?: number
  rFlatMagicPenetrationMod?: number
  rFlatMagicPenetrationModPerLevel?: number
  rPercentMagicPenetrationMod?: number
  rPercentMagicPenetrationModPerLevel?: number
  FlatEnergyRegenMod?: number
  rFlatEnergyRegenModPerLevel?: number
  FlatEnergyPoolMod?: number
  rFlatEnergyModPerLevel?: number
  PercentLifeStealMod?: number
  PercentSpellVampMod?: number
  [stat: string]: number | undefined
}

export class ItemsDataDragonDetails {
  name: string
  description: string
  colloq: string
  plaintext: string
  image: {
    full: string
    sprite: string
    group: string
    x: number
    y: number
    w: number
    h: number
  }

  gold: {
    base: number
    total: number
    sell: number
    purchasable: boolean
  }

  tags: string[]
  maps: {
    [mapId: string]: boolean
  }

  stats: ItemStatsDataDragon
  from?: string[]
  into?: string[]
  depth?: number
  group?: string
  inStore?: boolean
  hideFromAll?: boolean
  consumed?: boolean
  consumeOnFull?: boolean
  stacks?: number
  specialRecipe?: number
  requiredChampion?: string
  requiredAlly?: string
  rune?: {
    isrune: boolean
    tier: number
    type: string
  }
  effect?: {
    [key: string]: string
  }
}

export class ItemsDataDragonGroup {
  id: string
  MaxGroupOwnable: string
}

export class ItemsDataDragonTree {
  header: string
  tags: string[]
}

export class ItemsDataDragon {
  readonly type: string
  readonly version: string

  readonly basic: ItemsDataDragonDetails
  readonly data: {
    [itemId: string]: ItemsDataDragonDetails
  }

  readonly groups: ItemsDataDragonGroup[]
  readonly tree: ItemsDataDragonTree[]
}
