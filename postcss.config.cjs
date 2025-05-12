const config = cfg => {
    return {
        plugins: [
            require('autoprefixer'),
            require('cssnano'),
            require('postcss-import'),
            require('postcss-url')({
                url: asset => {
                    if (asset.url.startsWith('../')) {
                        return asset.url.replace('../', '')
                    }
                    return asset.url
                },
            }),
        ],
    }
}

module.exports = config
