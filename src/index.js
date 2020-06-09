const express = require('express');

require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

/* app.use(express.json()); automatically will parse incoming JSON to an object so we can access it in our request
handlers. */
app.use(express.json());

/* .post() method is used for the POST HTTP method configuration. There is also .get(), .patch() and .delete()
methods. */
app.post('/users', (req, res) => {
  const user = new User(req.body);

  user.save().then(() => {
    res.status(201).send(user);
  }).catch(error => {
    /* We set the status code response using the status method. We must make sure to set the status code before we send
    out the response. */
    res.status(400).send(error);
  });
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task.save().then(() => {
    res.status(201).send(task);
  }).catch(error => {
    res.status(400).send(error);
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});