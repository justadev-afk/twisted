<div align="center">

# 🎮 Twisted

### A fully‑typed Riot Games API wrapper for Node.js

League of Legends · Teamfight Tactics · Riot Account · Data Dragon

[![npm version](https://img.shields.io/npm/v/twisted?color=cb3837&logo=npm)](https://www.npmjs.com/package/twisted)
[![npm downloads](https://img.shields.io/npm/dm/twisted?color=blue&logo=npm)](https://www.npmjs.com/package/twisted)
[![node](https://img.shields.io/node/v/twisted?color=339933&logo=node.js&logoColor=white)](https://nodejs.org)
[![types](https://img.shields.io/npm/types/twisted?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![license](https://img.shields.io/npm/l/twisted?color=green)](./LICENSE)

</div>

---

## ✨ Highlights

- 🧩 **Complete coverage** — League of Legends, Teamfight Tactics, Riot Account and Data Dragon in one package.
- 🪶 **Lightweight** — built on the **native `fetch`** API. No `axios`, no `lodash`, no `dotenv`.
- 🔤 **First‑class TypeScript** — every endpoint, parameter and response is typed. Great autocompletion out of the box.
- 🔁 **Automatic rate‑limit retries** — `429`/`503` responses are retried honoring Riot's `Retry-After` header.
- 🚦 **Concurrency control** — cap how many requests hit Riot in parallel.
- 🧪 **Battle‑tested** — used in production by real projects.

> [!IMPORTANT]
> **v1.80** drops the `axios`, `lodash` and `dotenv` dependencies in favor of the platform.
> The minimum supported Node.js version is now **18** (the first LTS shipping a global `fetch`).
> See [Migrating to v1.80](#-migrating-to-v180).

---

## 📚 Table of contents

- [Installation](#-installation)
- [Quick start](#-quick-start)
- [Core concepts](#-core-concepts)
- [Configuration](#%EF%B8%8F-configuration)
- [Rate limiting & retries](#-rate-limiting--retries)
- [Error handling](#-error-handling)
- [Data Dragon](#-data-dragon)
- [Examples](#-examples)
- [Endpoint coverage](#-endpoint-coverage)
- [Migrating to v1.80](#-migrating-to-v180)
- [Contributing](#-contributing)

---

## 📦 Installation

```bash
npm install twisted
# or
yarn add twisted
# or
pnpm add twisted
```

**Requirements:** Node.js **≥ 18**. Get your API key at the [Riot Developer Portal](https://developer.riotgames.com/).

---

## 🚀 Quick start

The three entry points are `RiotApi` (account), `LolApi` (League of Legends) and `TftApi` (Teamfight Tactics).
Every call returns `{ response, rateLimits }` — your data lives in `response`.

<details open>
<summary><b>Riot Account</b> — resolve a Riot ID into a PUUID</summary>

```ts
import { RiotApi, Constants } from 'twisted'

const api = new RiotApi({ key: 'RGAPI-xxxxxxxx' })

async function getAccount () {
  // Use the routing value closest to your server: AMERICAS, ASIA or EUROPE
  const { response } = await api.Account.getByRiotId(
    'Hide on bush',           // gameName
    'KR1',                    // tagLine (the part after the #)
    Constants.RegionGroups.ASIA
  )
  return response // -> { puuid, gameName, tagLine }
}
```

</details>

<details open>
<summary><b>League of Legends</b> — summoner, ranked & matches</summary>

```ts
import { LolApi, Constants } from 'twisted'

const api = new LolApi({ key: 'RGAPI-xxxxxxxx' })

async function getRanked (puuid: string) {
  const summoner = (await api.Summoner.getByPUUID(puuid, Constants.Regions.KOREA)).response
  const ranked   = (await api.League.byPUUID(puuid, Constants.Regions.KOREA)).response

  const matchIds = (await api.MatchV5.list(puuid, Constants.RegionGroups.ASIA, { count: 5 })).response
  const lastGame = (await api.MatchV5.get(matchIds[0], Constants.RegionGroups.ASIA)).response

  return { summoner, ranked, lastGame }
}
```

</details>

<details>
<summary><b>Teamfight Tactics</b> — TFT summoner & matches</summary>

```ts
import { TftApi, Constants } from 'twisted'

const api = new TftApi({ key: 'RGAPI-xxxxxxxx' })

async function tftHistory (puuid: string) {
  const summoner = (await api.Summoner.getByPUUID(puuid, Constants.Regions.AMERICA_NORTH)).response
  const matchIds = (await api.Match.list(puuid, Constants.RegionGroups.AMERICAS, { count: 5 })).response
  return { summoner, matchIds }
}
```

</details>

---

## 🧠 Core concepts

### Response shape

Every API method (except Data Dragon) resolves to an `ApiResponseDTO<T>`:

```ts
{
  response: T          // the parsed payload
  rateLimits: {        // parsed from Riot's response headers
    AppRateLimit, AppRateLimitCount,
    MethodRateLimit, MethodRatelimitCount,
    RetryAfter, Type, EdgeTraceId
  }
}
```

### Regions vs. region groups

Riot exposes three different routing concepts. Twisted enforces the right one at the **type level**, so the compiler tells you when you pass the wrong kind.

| Concept | Type | Values | Used by |
| --- | --- | --- | --- |
| **Platform region** | `Regions` | `NA1`, `EUW1`, `KR`, `BR1`, … | Summoner, League, Champion Mastery, Spectator, Status |
| **Region group** | `RegionGroups` | `AMERICAS`, `ASIA`, `EUROPE`, `SEA` | Match‑V5, TFT Match |
| **Account routing** | `AccountAPIRegionGroups` | `AMERICAS`, `ASIA`, `EUROPE` | Account‑V1 |

```ts
import { Constants } from 'twisted'

Constants.Regions.EU_WEST        // 'EUW1'  — platform region
Constants.RegionGroups.EUROPE    // 'EUROPE' — routing value
```

### Providing your API key

The key is read from `process.env.RIOT_API_KEY`, or you can pass it explicitly:

```ts
new LolApi('RGAPI-xxxxxxxx')          // shorthand
new LolApi({ key: 'RGAPI-xxxxxxxx' }) // with options
```

> Since `dotenv` is no longer bundled, load a `.env` file with Node's built‑in flag
> (Node ≥ 20.6): `node --env-file=.env app.js`, or set the variable in your shell.

---

## ⚙️ Configuration

```ts
import { LolApi } from 'twisted'

const api = new LolApi({
  key: 'RGAPI-xxxxxxxx',
  rateLimitRetry: true,
  rateLimitRetryAttempts: 1,
  concurrency: undefined,
  debug: {
    logTime: false,
    logUrls: false,
    logRatelimits: false
  }
})
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | `string` | `process.env.RIOT_API_KEY` | Your Riot Games API key. |
| `rateLimitRetry` | `boolean` | `true` | Retry the request when Riot answers `429` / `503`. |
| `rateLimitRetryAttempts` | `number` | `1` | How many times to retry after a rate‑limit response. |
| `concurrency` | `number` | `Infinity` | Max concurrent requests **per service** (Summoner, Match, …). |
| `baseURL` | `string` | `https://$(region).api.riotgames.com/:game` | Point requests at a rate‑limiting proxy. `$(region)` and `:game` are substituted. |
| `debug.logTime` | `boolean` | `false` | Log each method's execution time. |
| `debug.logUrls` | `boolean` | `false` | Log the URL of every request. |
| `debug.logRatelimits` | `boolean` | `false` | Log whenever the client is waiting on a rate limit. |

---

## 🔁 Rate limiting & retries

When Riot returns **`429 Too Many Requests`** or **`503 Service Unavailable`**, Twisted automatically waits
(honoring the `Retry-After` header) and re‑issues the request up to `rateLimitRetryAttempts` times — query
parameters included. Disable it with `rateLimitRetry: false` if you manage limits yourself.

### Concurrency

```ts
// Never fire more than 10 concurrent requests per service
const api = new LolApi({ key, concurrency: 10 })
```

---

## 🧯 Error handling

Failed requests throw typed errors you can branch on:

```ts
import { LolApi, Constants, GenericError, RateLimitError, ServiceUnavailable, ApiKeyNotFound } from 'twisted'

try {
  await api.Summoner.getByPUUID(puuid, Constants.Regions.KOREA)
} catch (e) {
  if (e instanceof RateLimitError)   { /* 429 — retries exhausted */ }
  if (e instanceof ServiceUnavailable) { /* 503 */ }
  if (e instanceof ApiKeyNotFound)   { /* missing key */ }
  if (e instanceof GenericError)     { console.log(e.status, e.body) }
}
```

| Error | When |
| --- | --- |
| `ApiKeyNotFound` | No API key was provided. |
| `RateLimitError` | `429` and retries are exhausted/disabled. |
| `ServiceUnavailable` | `503` from the Riot API. |
| `GenericError` | Any other non‑2xx response (`status` and `body` attached). |

---

## 🐉 Data Dragon

Static game assets (champions, items, runes, versions…). Data Dragon hits the public CDN directly — **no API key,
no rate limiting** — so these methods return the raw payload instead of an `ApiResponseDTO`.

```ts
const api = new LolApi()

const versions = await api.DataDragon.getVersions()                 // ['15.x.1', …]
const champs   = await api.DataDragon.getChampionList()             // all champions
const aatrox   = await api.DataDragon.getChampion(Constants.Champions.AATROX)
const items    = await api.DataDragon.getItemList()                 // all items
const runes    = await api.DataDragon.getRunesReforged()
```

---

## 💡 Examples

A runnable example exists for **every endpoint** under [`/example`](./example).

```bash
# Run them all
RIOT_API_KEY=RGAPI-xxxx yarn example

# Run a subset by (case-insensitive) name match
RIOT_API_KEY=RGAPI-xxxx yarn example summoner
```

---

## 📋 Endpoint coverage

> Listed in the same order as the [official Riot documentation](https://developer.riotgames.com/apis).

<details>
<summary><b>Riot Account</b></summary>

#### ACCOUNT-V1
- [x] Get account by puuid
- [x] Get account by riot id
- [x] Get active region (lol and tft)
- [ ] Get account by puuid — ESPORTS
- [ ] Get account by riot id — ESPORTS
- [ ] Get active shard for a player
- [ ] Get account by access token

</details>

<details>
<summary><b>League of Legends</b></summary>

#### CHAMPION-MASTERY-V4
- [x] All champion mastery entries
- [x] Champion mastery by player & champion id
- [x] Total champion mastery score

#### CHAMPION-V3
- [x] Champion rotation

#### CLASH
- [x] Players by summoner id · Team · Tournaments · Tournament by team id · Tournament by id

#### MATCH-V5
- [x] Match by id · Matches by puuid · Match timeline · Available replays by puuid

#### MATCH-V4 *(deprecated)*
- [x] Matches by tournament code · Match by id · Match by tournament code · Matches by summoner id · Match timeline

#### LEAGUE-V4
- [x] Challenger / Grandmaster / Master leagues by queue
- [x] League entries by PUUID · by summoner id · all entries
- [x] League by id · Experimental league entries

#### LOL-CHALLENGES-V1
- [x] Config · Percentiles · Challenge config · Leaderboards · Challenge percentiles · Player challenges

#### LOL-STATUS-V4
- [x] Platform status (v4) · Shard status (v3, deprecated)

#### SPECTATOR-V5
- [x] Current game by summoner id · Featured games *(v4 deprecated)*

#### SUMMONER-V4
- [x] By account id · By PUUID · By summoner id

#### TOURNAMENT(-STUB)-V4
- [ ] Not yet implemented

</details>

<details>
<summary><b>Teamfight Tactics</b></summary>

#### TFT-SUMMONER-V1
- [x] By account id · By PUUID · By summoner id

#### TFT-MATCH-V1
- [x] Match list by PUUID · Match details

#### TFT-LEAGUE-V1
- [x] Challenger / Grandmaster / Master leagues
- [x] Entries by summoner id · By tier & division
- [ ] All entries · League by id

#### TFT-SPECTATOR-V5
- [x] Current game by puuid · Featured games

</details>

---

## 🔀 Migrating to v1.80

This release removes three runtime dependencies in favor of native platform features:

| Removed | Replaced by |
| --- | --- |
| `axios` | Native `fetch` (Node ≥ 18) |
| `lodash` | Native JS (`Object.entries`, spreads, …) |
| `dotenv` | `node --env-file=.env` or your own loader |

**What you need to do**

- Run on **Node 18 or newer**.
- If you relied on Twisted auto‑loading a `.env`, load it yourself — e.g. `node --env-file=.env`, or pass `new LolApi({ key })`.

The public API is otherwise **unchanged** — your existing calls keep working.

---

## 🤝 Contributing

```bash
yarn install      # install dependencies
yarn build        # compile TypeScript -> dist/
yarn lint         # eslint
yarn jest         # run the test suite (coverage is always collected)
```

PRs are welcome! For new endpoints: declare it in `src/endpoints`, add the service method, model the response DTO,
add an example, and wire it into the relevant entry class.

A larger real‑world project built on Twisted lives at [twisted‑gg](https://github.com/twisted-gg).

---

<div align="center">

Released under the [MIT License](./LICENSE).

</div>
