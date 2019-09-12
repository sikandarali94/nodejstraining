/* require('./utils') returns whatever value we exported from utils.js */
const add = require('./utils');
const getNotes = require('./notes');

const sum = add(3,4);

/* app.js has its own scope with its own variables. The same goes for utils.js. Therefore, app.js cannot access
utils.js' variables. If we want to get utils.js' variables we have to explicitly export it from utils.js.
 */
console.log(sum);
console.log(getNotes());
