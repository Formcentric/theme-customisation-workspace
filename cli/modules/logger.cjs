const chalk = require('chalk')

const write = console.log

const logger = {
    log: msg => write(msg),
    info: (msg, color = 'blue', icon = 'ℹ') => write(chalk[color](`${icon} ${msg}`)),
    success: (msg, color = 'green', icon = '✓') => write(chalk[color](`${icon} ${msg}`)),
    warn: (msg, color = 'yellow', icon = '⚠') => write(chalk[color](`${icon} ${msg}`)),
    error: (msg, color = 'red', icon = '✖') => write(chalk[color](`${icon} ${msg}`)),
}

module.exports = logger
