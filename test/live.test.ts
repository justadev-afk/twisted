import { LolApi, RiotApi } from '../src/index';
import { Regions, AccountAPIRegionGroups, regionToRegionGroupForAccountAPI } from '../src/constants/regions';
import * as fs from 'fs';
import * as path from 'path';
import { CurrentGameInfoDTO } from '../src/models-dto';
import { loadEnv } from './utils/loadEnv';

describe('Live API Tests', () => {
  let RIOT_API_KEY: string;
  let RIOT_GAME_NAME: string;
  let RIOT_TAG: string;
  let RIOT_REGION_STRING: string;
  let RIOT_REGION: Regions;
  let RIOT_ACCOUNT_REGION_GROUP: AccountAPIRegionGroups;
  let puuid: string;
  let lolApi: LolApi;
  let riotApi: RiotApi;

  beforeAll(async () => {
    const envFileName = '.env';
    const envPath = path.resolve(__dirname, '..', envFileName);

    if (!fs.existsSync(envPath)) {
      throw new Error(`Missing .env file at ${envPath}. Please create it with RIOT_API_KEY, RIOT_GAME_NAME, RIOT_TAG, RIOT_REGION.`);
    }

    loadEnv(envPath);

    RIOT_API_KEY = process.env.RIOT_API_KEY as string;
    RIOT_GAME_NAME = process.env.RIOT_GAME_NAME as string;
    RIOT_TAG = process.env.RIOT_TAG as string;
    RIOT_REGION_STRING = process.env.RIOT_REGION as string;

    if (!RIOT_API_KEY || !RIOT_GAME_NAME || !RIOT_TAG || !RIOT_REGION_STRING) {
      throw new Error("Missing one or more required environment variables in .env: RIOT_API_KEY, RIOT_GAME_NAME, RIOT_TAG, RIOT_REGION.");
    }

    RIOT_REGION = Regions[RIOT_REGION_STRING as keyof typeof Regions];
    RIOT_ACCOUNT_REGION_GROUP = regionToRegionGroupForAccountAPI(RIOT_REGION);

    lolApi = new LolApi({ key: RIOT_API_KEY });
    riotApi = new RiotApi({ key: RIOT_API_KEY });

    const account = await riotApi.Account.getByRiotId(RIOT_GAME_NAME, RIOT_TAG, RIOT_ACCOUNT_REGION_GROUP);
    puuid = account.response.puuid;
  });

  it('should successfully retrieve PUUID from Account API', () => {
    expect(puuid).toBeDefined();
    expect(typeof puuid).toBe('string');
    expect(puuid.length).toBe(78);
  });

  it('should successfully call Spectator API (player might not be in game)', async () => {
    try {
      const spectatorData = await lolApi.SpectatorV5.activeGame(puuid, RIOT_REGION);
      expect(spectatorData.response).toBeDefined();
      expect(spectatorData.response).toBeInstanceOf(CurrentGameInfoDTO);
    } catch (e) {
      // This is to avoid a bug in Jest when serializing errors that include circular dependencies
      // ...and that actually happens when .activeGame() throws a GenericError with status 404. 
      expect(e).toBeUndefined();
    }
  });

  it('should successfully call Clash API (player might not be in clash)', async () => {
    const clashData = await lolApi.Clash.playersList(puuid, RIOT_REGION);
    expect(clashData.response).toBeDefined();
    expect(Array.isArray(clashData.response)).toBeTruthy();
  });

});