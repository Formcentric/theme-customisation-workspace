import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';
import { sync } from 'glob';
import path from 'path';
import selectiveReloadPlugin from './utils/selectiveReloadPlugin.ts';
import themeWatcherPlugin from './utils/themeWatcherPlugin.ts';
import transformToIIFE from './utils/transformToIIFE.ts';
import buildPlugin from './utils/buildPlugin.ts';
import config from './config/formcentricConfig.json';

// https://vite.dev/config/
export default defineConfig(() => {
  const { fcUrl, fcProxyDomain, fcCloud, devServerPort } = config;

  const themes: string[] = sync('*', {
    cwd: 'src/themes',
    ignore: ['.*'],
  });

  return {
    build: {
      outDir: path.resolve('./dist/themes'),
      target: 'es2015',
      emptyOutDir: false,
      rollupOptions: {
        input: themes.reduce(
          (entries: Record<string, string>, theme) => {
            entries[`${theme}/script`] = path.resolve(
              'dist/themes',
              theme,
              'script.js'
            );

            return entries;
          },
          {}
        ),
        output: {
          format: 'cjs' as never,
          entryFileNames: '[name].js',
          plugins: [transformToIIFE()],
        },
      },
    },
    plugins: [
      react(),
      themeWatcherPlugin(),
      buildPlugin(),
      selectiveReloadPlugin(),
      copy({
        targets: [
          {
            src: 'node_modules/@formcentric/client/dist/formapp.js',
            dest: 'src/assets',
          },
          {
            src: 'node_modules/@formcentric/client/dist/formcentric.js',
            dest: 'src/assets',
          },
          {
            src: 'node_modules/@formcentric/client/dist/themes',
            dest: 'src',
            rename: 'fc-themes',
          },
        ],
        hook: 'buildStart',
      }),
    ],
    server: {
      port: devServerPort,
      ...(fcCloud && {
        proxy: {
          '/headless-server': {
            target: fcUrl,
            headers: {
              Referer: fcProxyDomain,
              Origin: fcProxyDomain,
              'Sec-Fetch-Mode': 'cors',
              'Sec-Fetch-Site': 'cross-site',
            },
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/headless-server/, ''),
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
  };
});
