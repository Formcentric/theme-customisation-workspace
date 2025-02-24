import chalk from 'chalk'

const write = console.log

// Type for valid chalk colors
type ChalkColor = keyof typeof chalk & ('blue' | 'green' | 'yellow' | 'red' | 'white')

const logger = {
    log: (msg: string) => write(msg),
    info: (msg: string, color: ChalkColor = 'blue', icon = 'ℹ') => write(chalk[color](`${icon} ${msg}`)),
    success: (msg: string, color: ChalkColor = 'green', icon = '✓') => write(chalk[color](`${icon} ${msg}`)),
    warn: (msg: string, color: ChalkColor = 'yellow', icon = '⚠') => write(chalk[color](`${icon} ${msg}`)),
    error: (msg: string, color: ChalkColor = 'red', icon = '✖') => write(chalk[color](`${icon} ${msg}`)),
    question: (msg: string, color: ChalkColor = 'blue', icon = '?') => write(chalk[color](`${icon} ${msg}`)),
    matrix: (
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
    },
}

export default logger
