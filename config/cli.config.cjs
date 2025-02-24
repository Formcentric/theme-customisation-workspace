module.exports = {
    assets: [
        {
            src: 'node_modules/@formcentric/client/dist/formapp.js',
            dest: 'src/assets/formapp.js',
        },
        {
            src: 'node_modules/@formcentric/client/dist/formcentric.js',
            dest: 'src/assets/formcentric.js',
        },
        {
            src: 'node_modules/@formcentric/client/dist/themes',
            dest: 'src/fc-themes',
        },
    ],
    paths: {
        basePath: 'src/fc-themes/',
        checkInPath: 'src/themes-base',
        targetPath: 'src/themes/',
        utilsPath: 'src/fc-themes/utils/',
        prettierConfigPath: '.prettierrc',
    },
    output: {
        fcThemesList: 'src/util/fcThemesList.json',
        themesList: 'src/util/themesList.json',
    },
    reset: {
        paths: [
            'node_modules',
            'src/fc-themes',
            'src/assets/formcentric.js',
            'src/assets/formapp.js',
            'src/util/fcThemesList.json',
            'src/util/themesList.json',
            'dist',
        ],
    },
}
