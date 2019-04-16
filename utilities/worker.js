global.Promise = require('bluebird')
global.Promise.config({
  warnings: true,
  longStackTraces: true,
  cancellation: true
})

const timer = require('./timeout')

const defaultOptions = {
  concurrency: 5,
  timeout: 3000,
  logOnFailure: false,
  logOnSuccess: false,
  recordSuccessStack: false,
  recordFailureStack: false
}

module.exports = async function (handler, options = {}) {
  options = { ...options, ...defaultOptions }
  const success = { count: 0, stack: [] }
  const failure = { count: 0, stack: [] }
  const times = [...Array(options.concurrency).keys()]

  await Promise.map(
    times,
    async () => {
      try {
        const result = await Promise.race([
          Promise.try(() => handler()),
          timer(options.timeout)
        ])
        success.count++
        if (options.recordSuccessStack) {
          success.stack.push(result)
        }
        if (options.logOnSuccess) {
          // eslint-disable-next-line
          console.log('Successful: ', result)
        }
      } catch (error) {
        failure.count++
        if (options.recordFailureStack) {
          failure.stack.push(error)
        }
        if (options.logOnFailure) {
          // eslint-disable-next-line
          console.log('Failed: ', error)
        }
      }
    },
    { concurrency: options.concurrency }
  )

  return { success, failure }
}

/*
Example:

async function handler () {
  // do something...
}

async function bootstrap () {
  await worker(handler)
  await sleep()
  await bootstrap()
}

bootstrap()
*/
