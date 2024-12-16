import { exec } from 'child_process';
import { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';

export default function buildPlugin(): Plugin {
  return {
    name: 'build-plugin',
    apply: 'build',
    buildStart() {
      const themesDir = path.resolve('src/themes');

      // Check if themes directory exists
      if (!fs.existsSync(themesDir)) {
        console.log(
          'Themes directory does not exist. Skipping Vite build...'
        );
        process.exit(0); // Exit successfully
      }

      // Get subdirectories
      const subfolders = fs
        .readdirSync(themesDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(themesDir, entry.name)); // Get full paths

      // Check each subfolder for required files
      const requiredFiles = ['script.js', 'styles.css'];
      const invalidFolders = subfolders.filter((folder) => {
        return !requiredFiles.every((file) =>
          fs.existsSync(path.join(folder, file))
        );
      });

      if (subfolders.length === 0) {
        console.log('No custom themes found. Skipping Vite build...');
        process.exit();
      }

      if (invalidFolders.length > 0) {
        if (invalidFolders.length > 0) {
          console.log(
            'Your themes folder contains invalid themes. The following folders are missing required files:'
          );
          invalidFolders.forEach((folder) =>
            console.log(`- ${folder}`)
          );
        }
      }

      exec('node ./preprocess.cjs && pnpm css dist/themes');
    },
  };
}
