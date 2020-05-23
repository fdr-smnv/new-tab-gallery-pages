const path = require('path');

const dataPath = path.join(process.cwd(), '/src/data/data.json');
const outputPath = path.join(process.cwd(), '/docs/');
const searchFilePath = path.join(outputPath, '/search.json');

module.exports = {
    dataPath,
    outputPath,
    searchFilePath,
}
