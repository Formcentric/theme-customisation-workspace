import readline from 'readline'

interface QuestionOptions {
    question: string
    onYes: () => Promise<unknown> | void
    onNo?: () => Promise<unknown> | void
}

const isYes = (answer: string) => answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y'
// const isNo = (answer: string) => answer.toLowerCase() === 'no' || answer.toLowerCase() === 'n'

export async function confirm({ question, onYes, onNo }: QuestionOptions): Promise<void> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise(resolve => {
        rl.question(question + '(yes/no) ', async answer => {
            if (isYes(answer)) {
                await onYes()
            } else {
                if (onNo) await onNo()
            }
            rl.close()
            resolve()
        })
    })
}

export default {
    confirm,
}
