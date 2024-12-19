import { Plugin } from 'vite'

export default function transformToIIFE(): Plugin {
    return {
        name: 'iife-plugin',
        generateBundle(_outputOptions, bundle) {
            for (const chunk of Object.values(bundle)) {
                if (chunk.isEntry) {
                    if (typeof chunk.code === 'string') {
                        chunk.code = `(function() {\n${chunk.code}})();`
                    }
                }
            }
        },
        renderChunk(code) {
            return {
                code: code.replace(/"use strict";?/, ''), // Remove "use strict" directive
            }
        },
    }
}
