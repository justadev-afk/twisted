/**
 * Champions - Used as fallback
 */
export enum Champions {
  EMPTY_CHAMPION = 0,
  ANNIE = 1,
  OLAF = 2,
  GALIO = 3,
  TWISTED_FATE = 4,
  XIN_ZHAO = 5,
  URGOT = 6,
  LEBLANC = 7,
  VLADIMIR = 8,
  FIDDLESTICKS = 9,
  KAYLE = 10,
  MASTER_YI = 11,
  ALISTAR = 12,
  RYZE = 13,
  SION = 14,
  SIVIR = 15,
  SORAKA = 16,
  TEEMO = 17,
  TRISTANA = 18,
  WARWICK = 19,
  NUNU = 20,
  MISS_FORTUNE = 21,
  ASHE = 22,
  TRYNDAMERE = 23,
  JAX = 24,
  MORGANA = 25,
  ZILEAN = 26,
  SINGED = 27,
  EVELYNN = 28,
  TWITCH = 29,
  KARTHUS = 30,
  CHOGATH = 31,
  AMUMU = 32,
  RAMMUS = 33,
  ANIVIA = 34,
  SHACO = 35,
  DR_MUNDO = 36,
  SONA = 37,
  KASSADIN = 38,
  IRELIA = 39,
  JANNA = 40,
  GANGPLANK = 41,
  CORKI = 42,
  KARMA = 43,
  TARIC = 44,
  VEIGAR = 45,
  TRUNDLE = 48,
  SWAIN = 50,
  CAITLYN = 51,
  BLITZCRANK = 53,
  MALPHITE = 54,
  KATARINA = 55,
  NOCTURNE = 56,
  MAOKAI = 57,
  RENEKTON = 58,
  JARVAN_IV = 59,
  ELISE = 60,
  ORIANNA = 61,
  MONKEY_KING = 62,
  BRAND = 63,
  LEE_SIN = 64,
  VAYNE = 67,
  RUMBLE = 68,
  CASSIOPEIA = 69,
  SKARNER = 72,
  HEIMERDINGER = 74,
  NASUS = 75,
  NIDALEE = 76,
  UDYR = 77,
  POPPY = 78,
  GRAGAS = 79,
  PANTHEON = 80,
  EZREAL = 81,
  MORDEKAISER = 82,
  YORICK = 83,
  AKALI = 84,
  KENNEN = 85,
  GAREN = 86,
  LEONA = 89,
  MALZAHAR = 90,
  TALON = 91,
  RIVEN = 92,
  KOG_MAW = 96,
  SHEN = 98,
  LUX = 99,
  XERATH = 101,
  SHYVANA = 102,
  AHRI = 103,
  GRAVES = 104,
  FIZZ = 105,
  VOLIBEAR = 106,
  RENGAR = 107,
  VARUS = 110,
  NAUTILUS = 111,
  VIKTOR = 112,
  SEJUANI = 113,
  FIORA = 114,
  ZIGGS = 115,
  LULU = 117,
  DRAVEN = 119,
  HECARIM = 120,
  KHAZIX = 121,
  DARIUS = 122,
  JAYCE = 126,
  LISSANDRA = 127,
  DIANA = 131,
  QUINN = 133,
  SYNDRA = 134,
  AURELION_SOL = 136,
  KAYN = 141,
  ZOE = 142,
  ZYRA = 143,
  KAISA = 145,
  GNAR = 150,
  ZAC = 154,
  YASUO = 157,
  VELKOZ = 161,
  TALIYAH = 163,
  CAMILLE = 164,
  BRAUM = 201,
  JHIN = 202,
  KINDRED = 203,
  JINX = 222,
  TAHM_KENCH = 223,
  LUCIAN = 236,
  ZED = 238,
  KLED = 240,
  EKKO = 245,
  QIYANA = 246,
  VI = 254,
  AATROX = 266,
  NAMI = 267,
  AZIR = 268,
  YUUMI = 350,
  THRESH = 412,
  ILLAOI = 420,
  REKSAI = 421,
  IVERN = 427,
  KALISTA = 429,
  BARD = 432,
  RAKAN = 497,
  XAYAH = 498,
  ORNN = 516,
  SYLAS = 517,
  NEEKO = 518,
  APHELIOS = 523,
  PYKE = 555,
  SENNA = 235,
  SETT = 875,
  LILLIA = 876,
  YONE = 777,
  SAMIRA = 360,
  SERAPHINE = 147,
  RELL = 526,
  VIEGO = 234,
  GWEN = 887,
  AKSHAN = 166,
  VEX = 711,
  ZERI = 221,
  RENATA_GLASC = 888,
  BELVETH = 200,
  NILAH = 895,
  KSANTE = 897,
  MILIO = 902,
  HWEI = 910,
  AURORA = 893,
  AMBESSA = 799,
  MEL = 800,
  NAAFIRI = 950,
  SMOLDER = 901,
  BRIAR = 233,
  YUNARA = 804
}

/**
 * Bidirectional id <-> name map (replaces lodash `invert`):
 * a numeric enum produces both `ANNIE -> 1` and `1 -> ANNIE` entries, so the
 * resulting map can resolve a champion in either direction.
 */
const championIdMap: { [key: string]: string } = {}
for (const [key, value] of Object.entries(Champions)) {
  championIdMap[String(value)] = key
}

/**
 * camelCase a snake_case / spaced string (replaces lodash `camelCase`).
 */
function camelCase (value: string): string {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter((part) => part.length > 0)
    .map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('')
}

/**
 * Fetching champion IDs from CommunityDragon's PBE content. See https://www.communitydragon.org/
 */
if (process.env.UPDATE_CHAMPION_IDS) {
  const updateChampionIDs = () => {
    const CD_CHAMPIONS = 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json'
    void fetch(CD_CHAMPIONS)
      .then((response) => response.json())
      .then((cdChamps: { id: number, alias: string }[]) => {
        cdChamps.forEach(({ id, alias }) => {
          const championAlias = alias.replace(/[a-z][A-Z]/g, letter => letter[0] + '_' + letter[1]).toUpperCase()
          if (!championIdMap[id]) {
            championIdMap[id] = championIdMap[id] || championAlias
            championIdMap[championAlias] = championIdMap[championAlias] || '' + id
          }
        })
      })
      .catch(() => {
        console.warn('Updating champion IDs failed')
      })
  }
  // Schedule once every day.
  setInterval(updateChampionIDs, 1000 * 60 * 60 * 24)
  updateChampionIDs()
}

/**
 * Get champion name by id
 */
export function getChampionName (champ: number): string {
  const result = championIdMap[champ]
  if (!result) {
    throw new Error(`Invalid champ id ${champ}`)
  }
  return result
}

/**
 * Get champion and by id and return capitalize string
 */
export function getChampionNameCapital (champ: number | string): string {
  let name = typeof champ === 'number' ? getChampionName(champ) : champ
  name = camelCase(name.toLowerCase())
  name = name.charAt(0).toUpperCase() + name.slice(1)
  switch (name) {
    case 'Reksai':
      return 'RekSai'
    case 'JarvanIv':
      return 'JarvanIV'
  }
  return name
}
