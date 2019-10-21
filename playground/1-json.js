const fs = require('fs');

const dataBuffer = fs.readFileSync('./1-json.json');
const dataJSON = dataBuffer.toString();
const dataParsed = JSON.parse(dataJSON);

const updatedData = { ...dataParsed, name: 'Sikandar', age: '24' };
const updatedJSONData = JSON.stringify(updatedData);
fs.writeFileSync('./1-json.json', updatedJSONData);