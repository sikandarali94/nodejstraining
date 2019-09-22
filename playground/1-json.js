const fs = require('fs');
// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// };
//
// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJSON);

/* What comes back from the readFileSync() method is not a string but actually a buffer which is way for node.js to
represent binary data. To convert the buffer to a data we use the .toString() method, as shown below. */
// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

const dataBuffer = fs.readFileSync('./1-json.json');
const dataJSON = dataBuffer.toString();
const dataParsed = JSON.parse(dataJSON);

const updatedData = { ...dataParsed, name: 'Sikandar', age: '24' };
const updatedJSONData = JSON.stringify(updatedData);
fs.writeFileSync('./1-json.json', updatedJSONData);