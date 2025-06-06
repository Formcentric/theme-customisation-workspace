export function componentToHex(c: number) {
    const hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
}

export function rgbToHex(r: number, g: number, b: number) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

export function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null
}

export function convertVariables(variables: Record<string, string>) {
    return Object.entries(variables).reduce((acc, [key, value]) => {
        if (value.startsWith('#')) {
            const rgb = hexToRgb(value)
            if (rgb) {
                return {
                    ...acc,
                    [key]: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
                }
            }
        }
        return {
            ...acc,
            [key]: value,
        }
    }, {})
}
