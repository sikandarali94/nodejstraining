/* The algorithm used in this application to hash the password is called: bcrypt. The npm package that provides this
hashing is called: bcryptjs. bcrypt is a hashing algorithm and there is an important distinction between hashing
algorithms and encryption algorithms. With encryption algorithms we can get the original value back -- hashing
algorithms do not work like this, they are one-way algorithms, which means we can't reverse the process. */
const express = require('express');
const bcrypt = require('bcryptjs');

require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

const myFunction = async () => {
  const password = 'Red12345!';
  /* The .hash() method return a promise. The first argument it receives is the plain text we want to hash. The
  second argument is the number of rounds the hashing algorithm is executed. A good number of rounds is 8 as it strikes
  a good balance between security and speed (recommended by the algorithm creator). If we use too few rounds the
  algorithm is a bit easier to crack. If we use too many rounds it takes too long for our application to be any use. */
  const hashedPassword = await bcrypt.hash(password, 8);

  console.log(password);
  console.log(hashedPassword);

  /* The compare() method lets us compare a plain text to its hashed counterpart to see if they match, it returns a
  promise that either resolves to true or false. */
  const isMatch = await bcrypt.compare('Red12345!', hashedPassword);
  console.log(isMatch);
}

myFunction();