import { spawn as childSpawn } from 'child_process'

const spawn = (
    command: string,
    args: string[] = [],
    options: { stdout?: boolean; stderr?: boolean; onClose?: (...args: unknown[]) => unknown } = {},
) => {
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

export default {
    spawn,
}
