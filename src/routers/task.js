const express = require('express');

const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }

});

router.get('/tasks', async (req, res) => {

  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }

});

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
  const updateProps = Object.keys(req.body);
  const allowedProps = ['description', 'completed'];

  const isValidRequest = updateProps.every(updateProp => allowedProps.includes(updateProp));

  if (!isValidRequest) {
    return res.status(400).send({ error: 'Invalid props for update' });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);

  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const user = await Task.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;