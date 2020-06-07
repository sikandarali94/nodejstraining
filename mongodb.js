// CRUD: Create, Read, Update and Delete
const mongodb = require('mongodb');

/* MongoClient gives us access to the functions necessary to connect to the database so we can perform the four basic
CRUD operations. */
const MongoClient = mongodb.MongoClient;

/* Note that we are using mongodb protocol, as shown below. We should write 127.0.0.1 instead of localhost, as writing
localhost has been known to create performance issues. */
const connectionURL = 'mongodb://127.0.0.1:27017';
/* We can write any name for the database as we like. In our case, we chose the name: task-manager. We do not need to
create the database beforehand as Mongo will create it for us if it does not exist. */
const databaseName = 'task-manager';

/* The connect() method takes in several arguments. The first is the connection URL. The second argument is the options
object to configure our connection. The third argument is the callback function. We should write "useNewUrlParser: true"
as the URL parser that was originally used by default is being deprecated. We need the new parser to be able to
correctly parse our connection URL. The callback function takes in two arguments. If the first argument exists (error)
, that means things went wrong and it will contain an error message describing why it could not connect. If the second
argument exists, that means things went well and now we're connected to the server and we can start to manipulate our
databases inside of the callback function. */
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!');
  }

  /* When we connect to to MongoDB, we have five or six open connections. That's because MongoDB uses a connection pool.
  This makes sure that our NodeJS application can communicate quickly even if we're trying to perform a lot of
  operations at the same time. The Node application runs continuously once we are connected to the database; if we want
  to close it we can using Ctrl+C in the terminal from where we ran our Node application. */
  console.log('Connected correctly!');

  /* client.db() gives us a reference to the database that we can store, as shown below. All we need to do is provide
  the database name. */
  const db = client.db(databaseName);

  /* To access/create a collection we can use the collection() method and provide the collection name. insertOne allows
  us to insert a single document into a collection. MongoDB generates a unique identifier for every document in our
  collection and stores it in the _id field. */
  /* We should provide a callback function as it tells us if the database operation was run successfully or not. The
  first argument provided to the callback is error and the second is result, as shown below. */
  // db.collection('users').insertOne({
  //   name: 'Andrew',
  //   age: 27
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user');
  //   }

    /* The most useful property on result is ops (an array), which contains all of the documents that were inserted, in
    this case. */
  //   console.log(result.ops);
  // });

  /* insertMany allows us to bulk insert multiple documents. */
  // db.collection('users').insertMany([
  //   {
  //     name: 'Jen',
  //     age: 28
  //   },
  //   {
  //     name: 'Gunther',
  //     age: 27
  //   }
  // ], (error, result) => {
  //     if (error) {
  //       return console.log('Unable to insert documents!');
  //     }
  //
  //     console.log(result.ops);
  // });

  db.collection('tasks').insertMany([
    {
      description: 'First task',
      completed: false
    },
    {
      description: 'Second task',
      completed: true
    },
    {
      description: 'Third task',
      completed: true
    }
  ], (error, result) => {
    if (error) {
      return console.log('Could not insert tasks!');
    }

    console.log(result.ops);
  });
});