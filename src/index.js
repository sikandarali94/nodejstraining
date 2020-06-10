/* It is good practice to separate routes based on resource e.g. User or Task in our case. */
const express = require('express');

require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/* Once we set up all the routes for a resource, we have to register it with our Express application. */
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});