import { DataDragonEnum } from '../../../constants/dataDragon'
import { RealmServers } from '../../../constants/realmServers'
import { RealmDTO, ChampionsDataDragon, QueuesDataDragonDTO, GameModesDataDragonDTO } from '../../../models-dto'
import { Champions, getChampionNameCapital } from '../../../constants/champions'
import { ChampionsDataDragonDetailsSolo } from '../../../models-dto/data-dragon/champions.datadragon.dto'
import { MapsDataDragonDTO } from '../../../models-dto/data-dragon/maps.datadragon.dto'
import { GameTypesDataDragonDTO } from '../../../models-dto/data-dragon/game-types.datadragon.dto'
import { RunesReforgedDTO } from '../../../models-dto/data-dragon/runes-reforged.dto'
import { ItemsDataDragon } from '../../../models-dto/data-dragon/items.datadragon.dto'

const defaultLang = 'en_US'

/**
 * Data Dragon is our way of centralizing League of Legends game data and assets, including champions, items, runes, summoner spells, and profile icons. All of which can be used by third-party developers. You can download a gzipped tar file (.tar.gz) for each patch which will contain all assets for that patch.
 * https://ddragon.Lol.com/cdn/dragontail-9.20.1.tgz
 * Please be aware that updating Data Dragon after each League of Legends patch is a manual process, so it is not always updated immediately after a patch. Your patience is appreciated.
 */
export class DataDragonService {
  // Internal methods
  private async request<T> (path: string, base: DataDragonEnum = DataDragonEnum.BASE): Promise<T> {
    const response = await fetch(`${base}/${path}`)
    if (!response.ok) {
      throw new Error(`Data Dragon request failed (${response.status} ${response.statusText}): ${base}/${path}`)
    }
    return await response.json() as T
  }
  // Riot requests
  // Data dragon
  async getRealms (server: RealmServers): Promise<RealmDTO> {
    const path = `realms/${server}.json`
    return this.request(path)
  }

  async getVersions (): Promise<string[]> {
    const path = 'api/versions.json'
    return this.request(path)
  }

  async getLanguages (): Promise<string[]> {
    const path = 'cdn/languages.json'
    return this.request(path)
  }

  /**
   * Runes reforged (perks)
   */
  async getRunesReforged (language?: string): Promise<RunesReforgedDTO[]> {
    const version = (await this.getVersions())[0]
    const lang = language || defaultLang
    const path = `cdn/${version}/data/${lang}/runesReforged.json`
    return this.request(path)
  }

  async getChampionList (language?: string): Promise<ChampionsDataDragon> {
    const version = (await this.getVersions())[0]
    const lang = language || defaultLang
    const path = `cdn/${version}/data/${lang}/champion.json`
    return this.request(path)
  }

  async getChampion (): Promise<ChampionsDataDragon>
  async getChampion (champ: Champions | number, language?: string ): Promise<ChampionsDataDragonDetailsSolo>
  async getChampion (champ?: Champions, language?: string ): Promise<ChampionsDataDragon | ChampionsDataDragonDetailsSolo> {
    const version = (await this.getVersions())[0]
    const lang = language || defaultLang
    let champName = ''
    let path = `cdn/${version}/data/${lang}/champion`
    if (champ) {
      champName = getChampionNameCapital(champ)
      path += `/${champName}.json`
    } else {
      path += '.json'
    }
    const fullResponse = await this.request<ChampionsDataDragon>(path)
    if (champ) {
      const response: any = fullResponse.data[champName]
      return response
    }
    return fullResponse
  }

  async getItemList(language?: string): Promise<ItemsDataDragon> {
    const version = (await this.getVersions())[0]
    const lang = language || defaultLang
    const path = `cdn/${version}/data/${lang}/item.json`
    return this.request(path)
  }

  // Static data
  async getQueues (): Promise<QueuesDataDragonDTO[]> {
    const path = 'docs/lol/queues.json'
    return this.request(path, DataDragonEnum.STATIC)
  }

  async getSeasons (): Promise<{ id: number, season: string}[]> {
    const path = 'docs/lol/seasons.json'
    return this.request(path, DataDragonEnum.STATIC)
  }

  async getMaps (): Promise<MapsDataDragonDTO[]> {
    const path = 'docs/lol/maps.json'
    return this.request(path, DataDragonEnum.STATIC)
  }

  async getGameModes (): Promise<GameModesDataDragonDTO[]> {
    const path = 'docs/lol/gameModes.json'
    return this.request(path, DataDragonEnum.STATIC)
  }

  async getGameTypes (): Promise<GameTypesDataDragonDTO[]> {
    const path = 'docs/lol/gameTypes.json'
    return this.request(path, DataDragonEnum.STATIC)
  }
}
