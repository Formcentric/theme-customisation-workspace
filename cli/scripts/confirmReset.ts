import readline from 'readline'
import { ps, logger } from '../modules'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.question('Your custom themes will be deleted if you proceed. Are you sure? (yes/no) ', async answer => {
    if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        logger.log('Resetting workspace...')
        try {
            // Split the command into command and arguments
            await ps.spawn('pnpm', ['tsx', 'cli/scripts/resetApp.ts'])
            await ps.spawn('pnpm', ['i'])
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error.message)
            } else {
                logger.error('An unknown error occurred')
            }
        }
    } else {
        logger.info('Script execution canceled.')
    }
    rl.close()
})
