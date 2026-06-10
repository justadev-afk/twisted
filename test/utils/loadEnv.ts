import * as fs from 'fs'

/**
 * Minimal `.env` loader shared across the test suite (replaces the `dotenv`
 * dependency).
 *
 * Parses `KEY=value` lines and populates `process.env` without overriding
 * variables that are already set. Blank lines and `#` comments are ignored,
 * and surrounding single/double quotes are stripped from values.
 *
 * @param envPath Absolute path to the `.env` file.
 */
export function loadEnv (envPath: string): void {
  const content = fs.readFileSync(envPath, 'utf-8')
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) {
      continue
    }
    const eqIndex = line.indexOf('=')
    if (eqIndex === -1) {
      continue
    }
    const key = line.slice(0, eqIndex).trim()
    const value = line.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, '')
    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}
