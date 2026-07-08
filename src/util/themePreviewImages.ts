const previewImageModules = import.meta.glob<{ default: string }>(
    '/node_modules/@formcentric/client/dist/themes/*/img/preview-image.*'
)

export function getPreviewImageLoader(themeName: string) {
    const key = Object.keys(previewImageModules).find(
        k => /\/themes\/([^/]+)\/img\/preview-image\.[^/]+$/.exec(k)?.[1] === themeName
    )
    return key ? previewImageModules[key] : undefined
}
