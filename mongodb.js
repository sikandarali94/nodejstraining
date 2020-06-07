/* Mongoose is an Object Document Mapper (ODM). It allows us to map our objects in our code. In regards to MongoDB, we
will be able to map our objects in Node.js to documents in MongoDB. */
const mongodb = require('mongodb');

const { MongoClient, ObjectID } = mongodb;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!');
  }

  const db = client.db(databaseName);
});