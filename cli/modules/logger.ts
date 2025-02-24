import chalk from 'chalk'

const write = console.log

type ColorFunc = (text: string) => string

const logger = {
    log: (msg: string) => write(msg),
    info: (msg: string, color: string = 'blue', icon = 'ℹ') =>
        write((chalk[color as keyof typeof chalk] as ColorFunc)(`${icon} ${msg}`)),
    success: (msg: string, color: string = 'green', icon = '✓') =>
        write((chalk[color as keyof typeof chalk] as ColorFunc)(`${icon} ${msg}`)),
    warn: (msg: string, color: string = 'yellow', icon = '⚠') =>
        write((chalk[color as keyof typeof chalk] as ColorFunc)(`${icon} ${msg}`)),
    error: (msg: string, color: string = 'red', icon = '✖') =>
        write((chalk[color as keyof typeof chalk] as ColorFunc)(`${icon} ${msg}`)),
}

export default logger
