const path = require('path')

const levels = [
    'Emergency',
    'Alert',
    'Critical',
    'Error',  // prod
    'Warning',
    'Notice',  // dev
    'Informational',
    'Debug'   // local
]

const availableLevel = {
    Critical: "Critical",
    Warning: "Warning",
    Debug: "Debug"
}

const logger = (level, ...args) => {
    const env = process.env['APP_ENV']

    if (!levels.includes(level))
        throw new Error('invalid log level')

    if (env === 'prod' && levels.indexOf(level) > 3)
        return

    if (env === 'dev' && levels.indexOf(level) > 5)
        return

    args.forEach(arg => {
        try {
            if (arg instanceof Error) {
                const errorInfo = `Error occurred in file: ${path.basename(__filename)} - ${arg.stack}`
                console.error(`Log level: ${level}, message: ${arg.message}\n${errorInfo}`)
            } else {
                console.log(`Log level: ${level}, message: ${arg}`)
            }
        } catch (error) {
            console.error(`Error in logger: ${error.message}`)
        }
    })
}

const criticalLog = (...args) => {
    logger(availableLevel.Critical, ...args)
}

const warningLog = (...args) => {
    logger(availableLevel.Warning, ...args)
}

const debugLog = (...args) => {
    logger(availableLevel.Debug, ...args)
}

module.exports = {
    criticalLog,
    warningLog,
    debugLog
}
