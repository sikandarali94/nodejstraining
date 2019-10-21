const fs = require('fs');
const chalk = require('chalk');

const successMessage = message => {
    return chalk.bgGreen.black(message);
};

const errorMessage = message => {
    return chalk.bgRed.black(message);
};

const listNotes = () => {
    console.log(successMessage('Your notes'));
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(note.title);
    })
};

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if (note) {
        console.log(successMessage(note.title));
        console.log(note.body);
    } else {
        console.log(errorMessage('Note does not exist!'));
    }
};

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    /* The debugger statement pauses the application at the point where it is stated. Then we can use the developer
    tools to look at any values that exist at the point where the debugger statement is stated. However, node
    applications will not pause at debugger statements by default; we have to run the node applications in debug mode
    to do that. To run node in debug mode we provide the inspect option e.g. node inspect app.js (if this doesn't work
    we can write: node --inspect-brk app.js).
    While the application is running in debug mode, we can then go on Chrome and type in the URL: chrome://inspect. We
    should have two targets running under Remote Target: localhost and 127.0.0.1. If we don't see 127.0.0.1 target, we
    can go into configure and add 127.0.0.1:9229 to the target discovery settings.
    We can click on inspect on a target and that brings up the developer tools. When in the developer tools, it is a
    good idea to add the folder of our project to the workspace, by selecting 'Add folder to workspace; and after
    selecting our project folder, allowing it to be added. */
    debugger;

    if (!duplicateNote) {
        notes.push({
            title,
            body
        });
        saveNotes(notes);
        console.log(successMessage('New note added!'));
    } else {
        console.log(errorMessage('Note title taken!'));
    }
};

const removeNote = title => {
    const notes = loadNotes();
    const updatedNotes = notes.filter(note => note.title !== title);
    if (notes.length === updatedNotes.length) {
        console.log(errorMessage('No note found!'));
    } else {
        console.log(successMessage('Note removed!'));
        saveNotes(updatedNotes);
    }
};

module.exports = {
    listNotes,
    readNote,
    addNote,
    removeNote
};
