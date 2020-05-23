const {
  readFileSync, existsSync,readdirSync, unlinkSync, rmdirSync, lstatSync, writeFileSync, mkdirSync,
} = require('fs');
const { join } = require('path');


function readJSONSync(path) {
  return JSON.parse(readFileSync(path, {encoding: 'utf8'}).toString());
}

function deleteFolderRecursive(path) {
  if (existsSync(path)) {
    readdirSync(path).forEach((file) => {
      const curPath = join(path, file);
      if (lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else {
        unlinkSync(curPath);
      }
    });
    rmdirSync(path);
  }
}

function generateFileStructureSync(data, outputPath = join(process.cwd(), '/output/')) {
  const getPath = (form, type, school, timeline) => `/${form}/${type}/${school}/${timeline}/`;

  const groupedItems = {};
  data.forEach((item) => {
    const { form, type, school, timeline } = item;
    if (!groupedItems[getPath(form, type, school, timeline)]) groupedItems[getPath(form, type, school, timeline)] = [];
    groupedItems[getPath(form, type, school, timeline)].push(item);
  })
  Object.keys(groupedItems).forEach(key => {
    const {form, type, school, timeline} = groupedItems[key][0];
    const filePath = join(outputPath, getPath(form, type, school, timeline));
    const fullPath = join(filePath, 'index.json');
    mkdirSync(filePath, { recursive: true });
    writeFileSync(fullPath, JSON.stringify(groupedItems[key]));
  })
  console.log('done')
}

function generateFileCountStructure(data) {
  const result = {};

  for (let i = 0; i < data.length ; i++) {
    const { form, type, school, timeline } = data[i];
    if (!result[form]) result[form] = {};
    if (!result[form][type]) result[form][type] = {};
    if (!result[form][type][school]) result[form][type][school] = {};
    if (!result[form][type][school][timeline]) result[form][type][school][timeline] = 0;
    result[form][type][school][timeline]++;
  }
  return result;
}

function traverse(data, settings, currentPath) {
  const currentSetting = settings[0];

  if (Number.isInteger(data)) {
    return {[currentPath]: data};
  }
  else if (data === undefined) {
    return;
  }

  if (currentSetting === 'any') {
    return Object.keys(data).forEach(key => traverseArray.push(traverse(data[key], settings.slice(1), currentPath+`/${key}`)));
  } else {
    return traverseArray.push(traverse(data[currentSetting], settings.slice(1), currentPath+`/${currentSetting}`));
  }
}

function searchFileCount(data, settings) {
  const resultObject = {};
  traverseArray = [];
  traverse(data, settings, '');
  for (let i = 0; i < traverseArray.length; i++) {
    const currentItem = traverseArray[i];
    if (currentItem !== undefined && !Number.isInteger(currentItem)) {
      const currentItemKey = Object.keys(currentItem)[0];
      resultObject[currentItemKey] = currentItem[currentItemKey]
    }
  }
  return resultObject;
}

module.exports = {
  generateFileStructureSync,
  deleteFolderRecursive,
  readJSONSync,
  generateFileCountStructure,
  searchFileCount
};
