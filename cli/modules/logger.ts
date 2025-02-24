import chalk from 'chalk'

const write = console.log

// Type for valid chalk colors
type ChalkColor = keyof typeof chalk & ('blue' | 'green' | 'yellow' | 'red')

const logger = {
    log: (msg: string) => write(msg),
    info: (msg: string, color: ChalkColor = 'blue', icon = 'ℹ') => write(chalk[color](`${icon} ${msg}`)),
    success: (msg: string, color: ChalkColor = 'green', icon = '✓') => write(chalk[color](`${icon} ${msg}`)),
    warn: (msg: string, color: ChalkColor = 'yellow', icon = '⚠') => write(chalk[color](`${icon} ${msg}`)),
    error: (msg: string, color: ChalkColor = 'red', icon = '✖') => write(chalk[color](`${icon} ${msg}`)),
}

export default logger
