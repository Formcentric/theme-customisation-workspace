const readline = require('readline')
const { exec } = require('child_process')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const commandToRun = 'node ./resetApp.cjs && pnpm i' // Replace with your script

rl.question('Your custom themes will be deleted if you proceed. Are you sure? (yes/no) ', answer => {
    if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        console.log('Resetting workspace...')
        exec(commandToRun, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`)
                return
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`)
                return
            }
            console.log(`Output: ${stdout}`)
        })
    } else {
        console.log('Script execution canceled.')
    }
    rl.close()
})
