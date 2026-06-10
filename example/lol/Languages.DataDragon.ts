import { LolApi } from '../../src'

/**
 * DATA DRAGON — Languages.
 *
 * Returns the list of locale codes (e.g. `en_US`, `es_ES`, `ko_KR`) that
 * Data Dragon ships localized data for. Pass any of these as the `lang`
 * argument of `getChampion`, `getChampionList`, etc. Raw CDN data: no key.
 */
export async function languagesDataDragon () {
  // Data Dragon needs no key
  const api = new LolApi()

  // 1. Fetch every supported locale code
  const languages = await api.DataDragon.getLanguages()

  console.log(`Locales available: ${languages.length}`)
  console.log(`Examples         : ${languages.slice(0, 5).join(', ')}`)

  return languages
}
