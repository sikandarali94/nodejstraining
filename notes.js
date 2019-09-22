const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes...';

const successMessage = message => {
    return chalk.bgGreen.black(message);
};

const errorMessage = message => {
    return chalk.bgRed.black(message);
};

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    /* If we don't have a file named notes.json, then we will get an error. That is why we should be writing defensive
    code as we have done with the try and catch statements. */
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
    const duplicateNotes = notes.filter(note => note.title === title);

    if (duplicateNotes.length === 0) {
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
    getNotes,
    addNote,
    removeNote
};
