const readline = require('readline')
const { ps, logger } = require('../modules/index.cjs')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.question('Your custom themes will be deleted if you proceed. Are you sure? (yes/no) ', async answer => {
    if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        logger.log('Resetting workspace...')
        try {
            // Split the command into command and arguments
            await ps.spawn('node', ['cli/scripts/resetApp.cjs'])
            await ps.spawn('pnpm', ['i'])
        } catch (error) {
            logger.error(error.message)
        }
    } else {
        logger.info('Script execution canceled.')
    }
    rl.close()
})
