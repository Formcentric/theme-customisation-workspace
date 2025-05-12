export function generateUid(input: string): string {
    let hash = 0
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash // Convert to 32-bit integer
    }
    return `${input}:fcid:${Math.abs(hash)}`
}

export function removeUid(input: string): string {
    return input.split(':fcid:')[0]
}
