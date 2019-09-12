/* require() method is what we use to load modules in. In this case, we are loading the file system module. */
const fs = require('fs');

/* Below code will create a notes.txt file, with the content as provided in the second argument. writeFileSync() creates
a new file if that file does not exist; if the file does exist, it will just overwrite the content of that file with
 what we provide in the second argument. */
fs.writeFileSync('notes.txt', 'My name is Sikandar Ali!');

/* appendFileSync() appends the content of the file we declare (in our case it is notes.txt) with the content we provide
in the second argument. */
fs.appendFileSync('notes.txt', '\nI was born in Pakistan');
