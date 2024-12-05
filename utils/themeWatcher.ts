import { exec } from 'child_process';
import chokidar from 'chokidar';
import { Plugin } from 'vite';

/**
 * A custom Vite plugin that watches files in the `src` folder
 * and triggers the Vite build process when changes are detected.
 */
export default function themeWatcher(): Plugin {
  return {
    name: 'theme-watcher', // Name of the plugin
    apply: 'serve', // Apply only during the development server
    configureServer(server) {
      // Path to watch: all .js files in the `src` directory
      const files = 'src/themes';

      // Create a watcher using chokidar
      const watcher = chokidar.watch(files, {
        ignoreInitial: true,
      });

      // Debounced build function
      const triggerBuild = () => {
        exec('pnpm build', (error, stdout, stderr) => {
          if (error) {
            console.error(
              `Error running build script: ${error.message}`
            );
            return;
          }
          if (stderr) {
            console.error(`Build script stderr: ${stderr}`);
          }
          console.log(`Build script stdout:\n${stdout}`);
        });
      };

      // Watch for changes and trigger actions
      watcher.on('change', async (filePath) => {
        console.log(`File changed: ${filePath}`);
        try {
          console.log('Building themes...');
          triggerBuild();
        } catch (err) {
          console.error('Error during build:', err);
        }
      });

      // Clean up the watcher when the server is stopped
      server.watcher.on('close', () => {
        watcher.close();
      });
    },
  };
}
