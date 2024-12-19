import { Plugin } from 'vite'

export default function selectiveReloadPlugin(): Plugin {
    return {
        name: 'selective-reload-plugin',
        apply: 'serve', // Only applies during dev
        handleHotUpdate({ file, server }) {
            // Check if the file is a `script.js` in the desired directory
            if ((file.endsWith('script.js') || file.endsWith('styles.css')) && file.includes('/themes/')) {
                // Invalidate the module and reload the page
                const modulesToReload = new Set(server.moduleGraph.getModulesByFile(file) || [])

                // Convert the Set to an Array before returning
                return Array.from(modulesToReload)
            }

            // Ignore other files
            return []
        },
    }
}
