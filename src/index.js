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

app.get('/users', (req, res) => {
  /* Mongoose provides methods for CRUD operations on a database similar to the ones that native Mongo provides. Please
  refer to the Mongoose documentation for all of these methods. */
  User.find({}).then(users => {
    res.status(200).send(users);
  }).catch(e => {
    /* With a 500 status code (internal server error), we generally do not send anything back. */
    res.status(500).send();
  });
});

/* Express gives us access to something called route parameters. These are parts of the URL that are used to capture
dynamic values. To create a route parameter we add a colon (:) followed by a name, as shown below. */
app.get('/users/:id', (req, res) => {
  /* The params object contains all of the route parameters that were provided in the URL. */
  const _id = req.params.id;
  /* With findById() method, we do not have to explicity convert an id string to an ObjectId by wrapping it in
  'new ObjectId()', this Mongoose method does it for us. */
  User.findById(_id).then(user => {
    /* It is important to note that a MongoDB query is not considered a failure if we do not get any results back when
    when we are looking for something -- in fact, it is considered a success. */
    if (!user) {
      /* 404 status code is set when a certain resource is not found. */
      return res.status(404).send();
    }

    res.send(user);
  }).catch(e => {
    res.status(500).send();
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

app.get('/tasks', (req, res) => {
  Task.find({}).then(tasks => {
    res.send(tasks);
  }).catch(e => {
    res.status(500).send();
  });
});

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;

  Task.findById(_id).then(task => {
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  }).catch(e => {
    res.status(500).send();
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});