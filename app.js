/* To install a npm module globally we use the -g flag e.g. npm install nodemon@1.18.5 -g. Global installation of a
package means that the package is installed on our operating system. package.json will not be altered when installing
a package globally because that package does not become a dependency of our application, but rather it is just installed
on our OS.

With nodemon installed globally, we can run our node scripts using nodemon e.g. nodemon app.js. nodemon reloads our
application automatically whenever we make changes to our script, which is a lot more convenient than manually reloading
it. */
const chalk = require('chalk');

const getNotes = require('./notes');

console.log(chalk.blue.bold.inverse('Error!'));
