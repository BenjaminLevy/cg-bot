const logger = require('./logger')

function terminate (client, timeout = 1000) {

  return (err, promise) => {
    logger.info("Exit handler called.")
    const isValidError = (err && err instanceof Error) ? true : false
    if (isValidError) {
        logger.error(err)
    }
    client.destroy()

    code = isValidError? 1 : 0
    setTimeout(process.exit(code), timeout).unref()
  }
}

module.exports = terminate
