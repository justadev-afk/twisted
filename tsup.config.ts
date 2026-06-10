import { defineConfig } from 'tsup'

/**
 * Bundles the whole library into a single minified `dist/index.js` plus a
 * rolled-up `dist/index.d.ts`. Runtime dependencies (promise-queue) are kept
 * external; the JSDoc on public types is preserved in the declaration file.
 */
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  target: 'node18',
  platform: 'node',
  dts: true,
  minify: true,
  sourcemap: false,
  clean: true,
  treeshake: true
})
