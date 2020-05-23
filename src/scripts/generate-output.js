const fs = require('fs');
const {readJSONSync, deleteFolderRecursive, generateFileStructureSync} = require('../utils/utils');
const {outputPath, dataPath} = require('../utils/constants');

try {
    const data = readJSONSync(dataPath);
    if (fs.existsSync(outputPath)) deleteFolderRecursive(outputPath);
    generateFileStructureSync(data, outputPath);
} catch (e) {
    throw e;
}
