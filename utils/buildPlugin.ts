import { exec } from 'child_process';
import { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';

export default function buildPlugin(): Plugin {
  return {
    name: 'build-plugin',
    apply: 'build',
    buildStart() {
      exec('node ./generateThemeList.cjs');

      const themesDir = path.resolve('src/themes');

      // Filter for subdirectories only
      const subfolders = fs
        .readdirSync(themesDir, { withFileTypes: true }) // Include entry type metadata
        .filter((entry) => entry.isDirectory()); // Only keep directories

      if (!fs.existsSync(themesDir) || subfolders.length === 0) {
        console.log('No custom themes found. Skipping Vite build...');
        process.exit(0); // Exit successfully
      }

      exec(
        'node ./preprocess.cjs && node ./generateThemeList.cjs && pnpm css'
      );
    },
  };
}
