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
app.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }

});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

/* Express gives us access to something called route parameters. These are parts of the URL that are used to capture
dynamic values. To create a route parameter we add a colon (:) followed by a name, as shown below. */
app.get('/users/:id', async (req, res) => {
  /* The params object contains all of the route parameters that were provided in the URL. */
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      /* 404 status code is set when a certain resource is not found. */
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }

});

app.get('/tasks', async (req, res) => {

  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }

});

app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.send(500).send();
  }
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});