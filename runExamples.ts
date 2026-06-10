import * as allExamples from './example'

const interval = 1000

function waiter (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function runExamples () {
  let examples = Object.keys(allExamples)
  const filter = process.argv[2]
  if (filter) {
    examples = examples.filter(v => v.toLowerCase().indexOf(filter.toLowerCase()) > -1)
  }
  console.log(`Total examples: ${examples.length}`)
  console.log('------------------------------------------------')
  for (const key of examples) {
    console.log(`Run ${key}`)
    const method = (allExamples as Record<string, unknown>)[key]
    if (typeof method !== 'function') {
      console.error(`Method ${key} isn't a function`)
      continue
    }
    console.time(key)
    let error: boolean | Error = false
    try {
      const response = await method()
      if (filter) {
        console.log(JSON.stringify(response))
      }
    } catch (e: any) {
      error = e
    } finally {
      console.error(`Method ${key}: ${error ? 'FAIL' : 'OK'}`)
      console.timeEnd(key)
      console.log('------------------------------------------------')
      if (error) {
        console.error(error)
        process.exit(1)
      }
      await waiter(interval)
    }
  }
}

runExamples()
  .catch()
