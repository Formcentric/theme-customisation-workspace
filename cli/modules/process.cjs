const { spawn: childSpawn } = require('child_process')

/**
 * Spawns a command and handles its output streams
 * @param {string} command - The command to run
 * @param {string[]} args - Array of command arguments
 * @param {Object} options - Configuration options
 * @param {boolean} options.stdout - Whether to pipe stdout (default: true)
 * @param {boolean} options.stderr - Whether to pipe stderr (default: true)
 * @param {function} options.onClose - Callback function when process closes
 * @returns {Promise} Resolves when process completes
 */
const spawn = (command, args = [], options = {}) => {
    const { stdout = true, stderr = true, onClose = () => {} } = options

    return new Promise((resolve, reject) => {
        const child = childSpawn(command, args, {
            stdio: [process.stdin, stdout ? process.stdout : 'ignore', stderr ? process.stderr : 'ignore'],
        })

        child.on('error', error => {
            reject(error)
        })

        child.on('close', code => {
            if (code === 0) {
                onClose(code)
                resolve(code)
            } else {
                reject(new Error(`Process exited with code ${code}`))
            }
        })
    })
}

module.exports = {
    spawn,
}
