/* To pass a value to our node application from the terminal, we can pass it as an argument (e.g. node app.js Sikandar
[Sikandar is the value we are passing]).
 */
const chalk = require('chalk');

const getNotes = require('./notes');

/* We can access the value arguments using process.argv (where 'process' is the global library provided by Node at
runtime, similar to 'window' provided by browsers). process.argv gives us all the arguments as an array. The interesting
thing is that process.argv considers every word in the terminal as an argument (e.g. in 'node app.js Sikandar',
process.argv returns: ['D:\\Program Files (x86)\\nodejs\\node.exe','D:\\Coding\\Practice\\NodeJS\\app.js','Sikandar'])
 */
// console.log(process.argv);

const command = process.argv[2];

if (command === 'add') {
    console.log('Adding note!');
} else if (command === 'remove') {
    console.log('Removing note!');
}
