const fs = require('fs-extra');
const path = require('path');

// Define directories and output files
const fcThemesDir = path.join(
  __dirname,
  'node_modules/@formcentric/client/dist/themes'
);
const themesDir = path.join(__dirname, 'src/themes');
const fcOutputFile = path.join(
  __dirname,
  'src/util/fcThemesList.json'
);
const themesOutputFile = path.join(
  __dirname,
  'src/util/themesList.json'
);

// Function to generate a list of folder names and write to a JSON file
const generateThemesList = (dirPath, outputFile) => {
  const folders = fs.readdirSync(dirPath).filter((file) => {
    const fullPath = path.join(dirPath, file);
    return fs.statSync(fullPath).isDirectory();
  });

  const filteredFolders = folders.filter((item) => item !== 'utils');

  fs.writeFileSync(
    outputFile,
    JSON.stringify(filteredFolders, null, 2)
  );
};

// Generate JSON files for both directories
generateThemesList(fcThemesDir, fcOutputFile);
generateThemesList(themesDir, themesOutputFile);
