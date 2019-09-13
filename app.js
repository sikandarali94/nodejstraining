/* Before we can import npm modules in our application, we first have to initialize npm within our application by
typing this command in the terminal: npm init. It will create a package.json file for us after taking us through the
steps. When we install an npm package, it creates/amends the package-lock.json and creates/amends the node_modules
folder with the installed package.
To specify what version of a package we want to install, we attach '@' to the package name followed by the version
number e.g. npm i validator@10.8.0. Note: 'i' is shorthand for 'install'.
At this moment, Node.js does not support ES6 imports (e.g. import validator from 'validator') but it eventually will.*/
const validator = require('validator');

const getNotes = require('./notes');

console.log(getNotes());
console.log(validator.isURL('https/sikandarali.me'));
