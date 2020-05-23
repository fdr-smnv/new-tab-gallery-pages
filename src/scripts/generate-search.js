const fs = require('fs');
const {generateFileCountStructure, readJSONSync} = require('../utils/utils');
const {dataPath, searchFilePath} = require('../utils/constants');

try {
    if (fs.existsSync(searchFilePath)) fs.unlinkSync(searchFilePath);
    const data = readJSONSync(dataPath);
    const searchData = generateFileCountStructure(data);
    fs.writeFileSync(searchFilePath, JSON.stringify(searchData));
    console.log('Done!');
} catch (e) {
    throw e;
}
