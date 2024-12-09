import { build, Plugin } from 'vite';
import { exec } from 'child_process';
import chokidar from 'chokidar';
import fs from 'fs-extra';
import path from 'path';
import transformToIIFE from './transformToIIFE';
import themeList from '../src/util/themesList.json';

/**
 * A custom Vite plugin that watches files in `src/themes`
 * and triggers the Vite build process when changes are detected.
 */
export default function themeWatcherPlugin(): Plugin {
  return {
    name: 'theme-watcher-plugin', // Name of the plugin
    apply: 'serve', // Apply only during the development server
    configureServer(server) {
      // Path to watch: all .js files in the `src` directory
      const themesDir = path.resolve('src/themes'); // Path to themes directory
      const distDir = path.resolve('dist/themes'); // Path to themes directory

      const buildJs = async (changedPath: string) => {
        const relativePath = path.relative(themesDir, changedPath);
        const themeName = relativePath.split('/')[0];

        const themeDir = path.join(themesDir, themeName); // Theme directory
        const inputFile = path.join(themeDir, 'script.js'); // Input file
        const outputFile = path.join(themeDir, 'script.min.js'); // Output file

        try {
          console.log(`Building script for theme: ${themeName}`);

          // Build the script.js file to script.min.js
          await build({
            configFile: false, // Inline configuration
            build: {
              outDir: themeDir,
              target: 'es2015',
              emptyOutDir: false,
              rollupOptions: {
                input: inputFile,
                output: {
                  format: 'cjs' as never,
                  entryFileNames: '[name].min.js',
                  plugins: [transformToIIFE()],
                },
              },
            },
          });

          // Copy the output file to dist/themes/<themeName>
          const distThemeDir = path.join(distDir, '/', themeName);

          await fs.ensureDir(distThemeDir); // Ensure the destination directory exists
          await fs.copyFile(
            outputFile,
            path.join(distThemeDir, 'script.js')
          );

          console.log(
            `script.min.js for theme ${themeName} built successfully.`
          );
        } catch (err) {
          console.error(
            `Error building script for theme ${themeName}:`,
            err
          );
        }
      };

      const buildStyles = async (changedPath: string) => {
        const relativePath = path.relative(themesDir, changedPath);
        const themeName = relativePath.split('/')[0];
        const themeDir = path.join(themesDir, themeName); // Theme directory
        const outputFile = path.join(themeDir, 'styles.css');

        const runBuildCommand = async () => {
          return new Promise<void>((resolve, reject) => {
            exec(
              `pnpm css src/themes/${themeName}`,
              (error, stdout, stderr) => {
                if (error) {
                  console.error(
                    `Error running build script: ${error.message}`
                  );
                  return reject(error);
                }
                if (stderr) {
                  console.error(`Build script stderr: ${stderr}`);
                }
                console.log(`Build script stdout:\n${stdout}`);
                resolve();
              }
            );
          });
        };

        try {
          // Wait for the build command to complete
          await runBuildCommand();

          // Ensure the destination directory exists
          const distThemeDir = path.join(distDir, themeName);
          await fs.ensureDir(distThemeDir);

          // Copy the styles.css file
          await fs.copyFile(
            outputFile,
            path.join(distThemeDir, 'styles.css')
          );
          console.log(
            `styles.css for theme ${themeName} copied successfully.`
          );
        } catch (error) {
          console.error(
            `Failed to build and copy styles for theme ${themeName}:`,
            error
          );
        }
      };

      const copyVariablesFile = async (changedPath: string) => {
        const relativePath = path.relative(themesDir, changedPath);
        const themeName = relativePath.split('/')[0];
        const themeDir = path.join(themesDir, themeName); // Theme directory
        const outputFile = path.join(themeDir, '_variables.json');
        const distThemeDir = path.join(distDir, themeName);

        await fs.copyFile(
          outputFile,
          path.join(distThemeDir, '_variables.json')
        );
      };

      // Create a watcher using chokidar
      const watcher = chokidar.watch(themesDir, {
        ignoreInitial: true,
      });

      // Watch for changes and trigger actions
      watcher.on('change', async (filePath) => {
        try {
          if (filePath.includes('.scss')) {
            console.log(`File changed: ${filePath}`);
            console.log('Building styles.css...');

            buildStyles(filePath);
          } else if (
            filePath.includes('.js') &&
            !filePath.includes('.min.js')
          ) {
            console.log(`File changed: ${filePath}`);
            console.log('Building script.js...');

            buildJs(filePath);
          } else if (filePath.includes('_variables.json')) {
            console.log(`File changed: ${filePath}`);
            console.log('Copying variables.json...');
            copyVariablesFile(filePath);
          }
        } catch (err) {
          console.error('Error during build:', err);
        }
      });

      watcher.on('unlinkDir', async (filePath) => {
        const baseName = path.basename(filePath); // Get the name of the deleted directory

        if (themeList.includes(baseName))
          exec('node ./generateThemeList.cjs');
      });

      // Clean up the watcher when the server is stopped
      server.watcher.on('close', () => {
        watcher.close();
      });
    },
  };
}
