/* Node has a built in debugger called: node debugger. It integrates with V8 and the Chrome browser. */
const yargs = require('yargs');

const notes = require('./notes');

yargs.version('1.1.0');

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.listNotes();
    }
});

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler({ title, body }) {
        notes.addNote(title, body);
    },
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler({ title }) {
        notes.removeNote(title);
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler({ title }) {
        notes.readNote(title);
    }
});

yargs.parse();