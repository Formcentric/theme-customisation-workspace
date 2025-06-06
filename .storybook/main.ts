import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
    stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-docs'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    viteFinal: config => {
        config.css = {
            preprocessorOptions: {
                css: {
                    variables: true,
                },
            },
        }
        return config
    },
    docs: {},
}
export default config
