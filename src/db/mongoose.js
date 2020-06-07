const mongoose = require('mongoose');

/* The mongoose.connect() method is very similar to the MongoClient connect method, however, we do not provide the
database name separately. Instead, we provide it after the database url, as shown below (task-manager-api is the name
of the database).
 */
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  /* useCreateIndex: true ensures that when Mongoose works with MongoDB, our indexes are created allowing us to quickly
  access the data we need. */
  useCreateIndex: true
});

/* We use mongoose.model to define a Mongoose Model. The first argument is the name we want to give to the model, the
second argument is the schema of the model. In the schema we can set the type, validation, and so forth for each
property in the schema. If we create data with the Model that does not conform to the schema then we get an error. */
const User = mongoose.model('User', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

/* Below we are creating an instance of a Mongoose Model. */
const me = new User({
  name: 'Sikandar',
  age: 25
});

/* The save() method simply saves the data that we defined to the Mongo database. This returns a promise. */
me.save().then(() => {
  /* Mongoose adds an additional property when we save a document to the DB: __v (this stores the version of the
  document starting from 0). */
  console.log(me);
}).catch(error => {
  console.log('Error!', error);
});