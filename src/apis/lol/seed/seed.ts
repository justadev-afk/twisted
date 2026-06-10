import { DataSeed } from '../../../constants/dataSeed'
import { MatchDto } from '../../../models-dto/matches/match/match.dto'

export class SeedApi {
  private readonly baseUrl = DataSeed.BASE

  private async request<T> (path: string): Promise<T> {
    const url = `${this.baseUrl}/${path}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Seed request failed (${response.status} ${response.statusText}): ${url}`)
    }
    return await response.json() as T
  }

  async matches (id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10): Promise<{ matches: MatchDto[] }> {
    if (id < 1 || id > 10) {
      throw new Error('Invalid index')
    }
    const path = `matches${id}.json`
    return this.request(path)
  }
}
