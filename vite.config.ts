import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { sync } from 'glob'
import path from 'path'
import transformToIIFE from './utils/transformToIIFE.ts'
import buildPlugin from './utils/buildPlugin.ts'
import themeWatcherPlugin from './utils/themeWatcher.ts'
import cloudConfig from './config/cloudConfig.json'
import config from './config/cli.config.json'

type FcEnv = 'local' | 'cloud'
// https://vite.dev/config/
export default defineConfig(() => {
    const fcEnv: FcEnv = (process.env.VITE_FC_ENV as FcEnv) || 'cloud'

    const themes: string[] = sync('*', {
        cwd: config.paths.targetPath,
        ignore: ['.*'],
    })

    return {
        build: {
            outDir: path.resolve(config.paths.output),
            target: 'es2015',
            emptyOutDir: false,
            rollupOptions: {
                input: themes.reduce((entries: Record<string, string>, theme) => {
                    entries[`${theme}/script`] = path.resolve(config.paths.output, theme, 'script.js')

                    return entries
                }, {}),
                output: {
                    format: 'cjs' as never,
                    entryFileNames: '[name].js',
                    plugins: [transformToIIFE()],
                },
                external: (id: string) => id.startsWith(config.paths.moduelPath),
            },
        },
        plugins: [react(), themeWatcherPlugin(), buildPlugin()],
        define: {
            FC_ENV: JSON.stringify(fcEnv),
        },
        server: {
            port: 3000,
            ...(fcEnv === 'cloud' && {
                proxy: {
                    '/headless-server': {
                        target: cloudConfig.fcUrl,
                        headers: {
                            'Sec-Fetch-Mode': 'cors',
                            'Sec-Fetch-Site': 'cross-site',
                        },
                        changeOrigin: true,
                        secure: false,
                        rewrite: (path: string) => path.replace(/^\/headless-server/, ''),
                        // enables proxy logs -----------------------------------------------------------
                        // configure: (proxy: any, _options: any) => {
                        //   proxy.on('proxyReq', function (proxyReq: any, req: any) {
                        //     process.stdout.write(
                        //       `[REQUEST] Headers: ${JSON.stringify(
                        //         proxyReq.getHeaders()
                        //       )}\n`
                        //     );
                        //     process.stdout.write(
                        //       `[REQUEST] Target: https://form.formcentric.dev${req.url.replace(
                        //         /^\/formcentric/,
                        //         ''
                        //       )}\n`
                        //     );
                        //   });
                        //   proxy.on('proxyRes', function (proxyRes: any, _req: any) {
                        //     process.stdout.write(
                        //       `[RESPONSE] Status: ${proxyRes.statusCode}\n`
                        //     );
                        //     process.stdout.write(
                        //       `[RESPONSE] Headers: ${JSON.stringify(
                        //         proxyRes.headers
                        //       )}\n`
                        //     );
                        //   });
                        //   proxy.on('error', function (err: any, req: any) {
                        //     process.stdout.write(`[ERROR] ${err} for ${req.url}\n`);
                        //   });
                        // },
                        // enables proxy logs -----------------------------------------------------------
                    },
                },
            }),
        },
    }
})
