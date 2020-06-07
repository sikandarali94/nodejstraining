const mongoose = require('mongoose');
const validator = require('validator');

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
/* To make a field required, we place 'required: true' in the schema, as shown below. To create custom validation, we
set the validate() method; the validate() method is passed the actual field value with which we can validate. With
custom validation we can set the error message using throw new Error(), as shown below. For more complex validation, it
is recommended we use the validator npm library as we have done here. 'trim: true' trims the whitespace around a value.
'lowercase: true' lowers the case of the value. 'default:...' sets the default value of a field if no value is provided
for it. */
const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  /* minlength validates that a value must be of a minimum length. It is recommended not to store passwords as plain
  text. */
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  }
});

// /* Below we are creating an instance of a Mongoose Model. */
// const me = new User({
//   name: ' Sikandar  ',
//   email: 'myemail@mead.IO  ',
//   password: 'phone098!'
// });
//
// /* The save() method simply saves the data that we defined to the Mongo database. This returns a promise. */
// me.save().then(() => {
//   console.log(me);
// }).catch(error => {
//   console.log('Error!', error);
// });

/* Mongoose actually takes the model name we provided, converts it to lower case and pluralises it and sets the result
as the collection name. */
const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const firstTask = new Task({
  description: '  First Task   '
});

firstTask.save().then(() => {
  console.log(firstTask);
}).catch(error => {
  console.log('Error!', error);
});