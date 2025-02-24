import chalk from 'chalk'
import { messages } from '../constants'

type Replacements = { [key: string]: string | number }

const t = (key: string, replacements?: Replacements): string => {
    // Split the key by dots to traverse the messages object
    const parts = key.split('.')
    let message: any = messages

    // Find the message in the nested structure
    for (const part of parts) {
        message = message[part]

        if (!message) return key // Return the key if message not found
    }

    if (typeof message !== 'string') return key

    // Replace placeholders if replacements provided
    if (replacements) {
        return message.replace(/\{\{(\w+)\}\}/g, (_, key) => String(replacements[key] ?? `{{${key}}}`))
    }

    return message
}

const matrix = (
    headers: string[],
    rows: string[][],
    title?: string,
    defaultColor: ChalkColor = 'blue',
    valueColors?: Record<string, ChalkColor>,
) => {
    // Find the maximum width for each column
    const colWidths = headers.map((h, i) => {
        const columnItems = [h, ...rows.map(row => row[i] || '')]
        return Math.max(...columnItems.map(item => item.length)) + 2
    })

    const separator = '+' + colWidths.map(w => '-'.repeat(w)).join('+') + '+'

    // Modified createRow to handle colored items
    const createRow = (items: string[]) =>
        '|' +
        items
            .map((item, i) => {
                const color = i === 0 || !valueColors ? defaultColor : valueColors[item] || defaultColor
                return chalk[color](item.padEnd(colWidths[i], ' '))
            })
            .join('|') +
        '|'

    if (title) write(chalk[defaultColor](title))
    write(chalk[defaultColor](separator))
    write(chalk[defaultColor](createRow(headers)))
    write(chalk[defaultColor](separator))
    rows.forEach(row => write(createRow(row)))
    write(chalk[defaultColor](separator))
}

const write = console.log

// Type for valid chalk colors
type ChalkColor = keyof typeof chalk & ('blue' | 'green' | 'yellow' | 'red' | 'white')

const logger = {
    t,
    matrix,
    log: (msg: string, replacements?: Replacements) => write(t(msg, replacements)),
    info: (msg: string, replacements?: Replacements, color: ChalkColor = 'blue', icon = 'ℹ') =>
        write(chalk[color](`${icon} ${t(msg, replacements)}`)),
    success: (msg: string, replacements?: Replacements, color: ChalkColor = 'green', icon = '✓') =>
        write(chalk[color](`${icon} ${t(msg, replacements)}`)),
    warn: (msg: string, replacements?: Replacements, color: ChalkColor = 'yellow', icon = '⚠') =>
        write(chalk[color](`${icon} ${t(msg, replacements)}`)),
    error: (msg: string, replacements?: Replacements, color: ChalkColor = 'red', icon = '✖') =>
        write(chalk[color](`${icon} ${t(msg, replacements)}`)),
    question: (msg: string, replacements?: Replacements, color: ChalkColor = 'blue', icon = '?') =>
        write(chalk[color](`${icon} ${t(msg, replacements)}`)),
}

export default logger
