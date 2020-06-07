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

  /* findOne() is used to query for a single document (the first one found). It accepts two required arguments: the
  first is an object where we specify our search criteria, and the second one is a callback function where first
  argument passed is an error and the second is the document that was found relating to the search criteria. If a
  document is not found, we do not get an error, however, null is passed to the second argument in the callback
  function. If we want to search by ID, we have to encapsulate the ID in new ObjectID, as shown below.  */
  // db.collection('users').findOne({ _id: new ObjectID("5edcb1a72d44403f6c24a623") }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch user');
  //   }
  //
  //   console.log(user);
  // });

  /* The find() method is a bit different to findOne(). That is because it does not accept a callback function as a
  second argument. Instead we get back from find() is actually a Cursor and the cursor is not the data we are looking
  for. The cursor is actually a pointer to the data in the database. The reason we are getting back a cursor is because
  MongoDB isn't going to assume that every time we use find() we always want to get back an array of all of those
  documents. There are a lot of other things we might want to do like just get back the first five documents. Therefore
  a cursor opens up a lot more possibilities (please refer to official docs for all the operations we can do on a
  cursor). The toArray() method takes all the documents pointed to by the Cursor and returns them as an array. */
  // db.collection('users').find({ age: 27 }).toArray((error, users) => {
  //   console.log(users);
  // });

  /* count() returns the number of documents pointed to by the Cursor. If we wanted to just get the number of documents,
  we should never store the documents in memory and then count them, instead just apply the count() method directly, as
  shown below. */
  // db.collection('users').find({ age: 27 }).count((error, users) => {
  //   console.log(users);
  // });

  db.collection('tasks').findOne({ _id: new ObjectID('5edc8ea521e9f64710e98ad4') }, (error, task) => {
    if (error) {
      return console.log('Unable to find task');
    }

    console.log(task);
  });

  db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    if (error) {
      return console.log('Unable to find tasks');
    }

    console.log(tasks);
  });

  /* MongoDB CRUD methods return a promise when no callback is passed. updateOne is used to update a single document.
  The first argument is an object through which we filter the database for a particular document. The second argument
  contains all of the update operations we want to apply to our document. */
  // db.collection('users').updateOne({
  //   _id: new ObjectID('5edc8af0b30b880e64cb1951')
  // }, {
  //   /* $set is one of many update operators we can apply to update documents. $inc is used to increment/decrement a
  //   number value by a certain amount. */
  //   // $set: {
  //   //   name: 'Mike'
  //   // }
  //   $inc: {
  //     age: 1
  //   }
  // }).then(result => {
  //   /* What we get back in result is a very long object. The most common properties used from the object are
  //   modifiedCount (how many documents were modified) and matchedCount (how many documents were matched by the filter
  //   object). */
  //   console.log(result);
  // }).catch(error => {
  //   console.log(error);
  // });

  /* updateMany is used to update multiple documents at once. */
  db.collection('tasks').updateMany({
    completed: false
  }, {
    $set: {
      completed: true
    }
  }).then(result => {
    console.log(result);
  }).catch(error => {
    console.log(error);
  });
});