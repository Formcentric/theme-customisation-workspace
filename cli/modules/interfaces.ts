import inquirer from 'inquirer'
import logger from './logger'

export async function confirm(question: string): Promise<boolean> {
    try {
        const { confirmed } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirmed',
                message: logger.t(question),
                default: false,
            },
        ])
        return confirmed
    } catch (error: unknown) {
        if (error instanceof Error && error.message === 'SIGINT') {
            process.exit(0)
        }
        throw error
    }
}

export async function select(message: string, choices: any[]) {
    try {
        const { selected } = await inquirer.prompt([
            {
                type: 'list',
                name: 'selected',
                message,
                choices,
            },
        ])
        return selected
    } catch (error: unknown) {
        console.log(error)

        if (error instanceof Error && error.message === 'SIGINT') {
            process.exit(0)
        }
        throw error
    }
}

type Question = {
    name: string
    message: string
    type?: 'input' | 'password' | 'number'
    default?: string | number
}

export async function questions(questions: Question[]): Promise<Record<string, any>> {
    try {
        const prompts = questions.map(q => ({
            type: q.type || 'input',
            ...q,
        }))

        const answers = await inquirer.prompt(prompts)
        return answers
    } catch (error: unknown) {
        if (error instanceof Error && error.message === 'SIGINT') {
            process.exit(0)
        }
        throw error
    }
}

export default {
    confirm,
    select,
    questions,
}
