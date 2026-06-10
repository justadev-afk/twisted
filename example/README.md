# Twisted Examples

A runnable example for (almost) every Riot API endpoint that [`twisted`](../) wraps —
League of Legends, Teamfight Tactics, Riot Account, Data Dragon and Clash.

Each file exports a single named `async` function that performs a small, self-contained
call and logs a friendly summary of the result. They double as living documentation:
read them to see the exact shape of a request and its response.

## How to run

Examples need a Riot API key, read from `process.env.RIOT_API_KEY`. Grab one from the
[Riot Developer Portal](https://developer.riotgames.com/).

```bash
# Run every example
RIOT_API_KEY=RGAPI-xxxx yarn example

# Run a single example by name (case-insensitive substring match)
RIOT_API_KEY=RGAPI-xxxx yarn example account
RIOT_API_KEY=RGAPI-xxxx yarn example datadragon
```

When you pass a name, the runner matches every exported function whose name *contains*
it, runs them, and prints the JSON they return. With no argument, it runs them all in
sequence (with a short delay between calls to stay friendly to rate limits).

> **Use your own account.** The examples target a few demo Riot IDs defined in
> [`config/config.ts`](./config/config.ts). Edit that file to point at your own
> account (`summonerName` / `tagLine` / `region` / `regionGroup`) before running.

## What's inside

| Folder | Category | Examples | Highlights |
| --- | --- | --- | --- |
| [`riot/`](./riot) | **Riot Account** (Account-V1) | 2 | Resolve a Riot ID ↔ PUUID; the entry point for everything else. Routed by region *group*. |
| [`lol/`](./lol) | **League of Legends** | 19 | Summoner, League/ranked, Champion mastery & rotation, Match-V5, Spectator-V5, Challenges, Status. |
| [`lol/*.DataDragon.ts`](./lol) | **Data Dragon** (static CDN) | 12 | Champions, runes, maps, queues, versions and more — no API key, no rate limits. |
| [`lol/deprecated/`](./lol/deprecated) | **LoL (deprecated)** | 11 | Older endpoints kept for reference (summoner-by-name, Match-V4, Spectator-V4, …). Prefer the current ones. |
| [`tft/`](./tft) | **Teamfight Tactics** | 9 | Summoner, league by tier/summoner, Match-V1, Spectator, static files. |
| [`clash/`](./clash) | **Clash** | 2 | List tournaments and fetch one by id. |

## Regions vs region groups

Riot uses two routing concepts, both demonstrated in the examples and documented in
[`config/config.ts`](./config/config.ts):

- **`Regions`** — platform routing (`EUW1`, `KR`, `NA1`, …) used by most LoL/TFT endpoints.
- **`RegionGroups`** — routing groups (`AMERICAS`, `ASIA`, `EUROPE`, `SEA`) used by
  Match-V5, TFT-Match and the Account API.

The library's types enforce which one each endpoint accepts.
