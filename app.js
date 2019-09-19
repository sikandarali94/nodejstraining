/* To pass a value to our node application from the terminal, we can pass it as an argument (e.g. node app.js Sikandar
[Sikandar is the value we are passing]). */
const chalk = require('chalk');
const yargs = require('yargs');

const getNotes = require('./notes');

/* We can access the value arguments using process.argv (where 'process' is the global library provided by Node at
runtime, similar to 'window' provided by browsers). process.argv gives us all the arguments as an array. The interesting
thing is that process.argv considers every word in the terminal as an argument (e.g. in 'node app.js Sikandar',
process.argv returns: ['D:\\Program Files (x86)\\nodejs\\node.exe','D:\\Coding\\Practice\\NodeJS\\app.js','Sikandar'])*/
/* yargs is a very popular library for parsing arguments passed to node through the terminal. */
// console.log(process.argv);

// console.log(process.argv);
/* If someone wants to know the version number of our application we can set that through yargs.version(), as shown
below. So when we run, for example: node app.js --version, yargs will output 1.1.0 in our case. */
yargs.version('1.1.0');

/* By adding a new command with describe, if we write in the terminal: node app.js --help, we will see something like
this appear:
Commands:
    app.js add Add a new note

When we run the command below [node app.js add] the handler function is executed.
*/
yargs.command({
    command: 'add',
    /* We don't have to describe our command but it is a good idea. */
    describe: 'Add a new note',
    handler: function() {
        console.log('Adding a new note!');
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function() {
        console.log('Removing the note')
    }
});

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: function() {
        console.log('Listing all notes');
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function() {
        console.log('Reading a note');
    }
});

/* If we type this in the terminal: node app.js add --title="Things to buy", yargs.argv returns an object:
{ _: [ 'add' ], title: 'Things to buy', '$0': 'app.js' }. We can see that the value passed to --title is parsed.
Calling yargs.argv is what signals to yargs to start processing the command line arguments provided. Otherwise none of
the commands above will process e.g. node app.js add, will not execute the handler method of we do not call yargs.argv.
*/
console.log(yargs.argv);