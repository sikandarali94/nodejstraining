/* Mongoose provides us with middleware which we use to register some functions to run before or after given events
occur e.g. we can register functions just before or just after a user is validated. */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

/* By defining the schema beforehand using 'new mongoose.Schema()', we can apply middleware. Note that when we just
pass an object into mongoose.model as the second argument, Mongoose automatically converts the object into a schema,
however, we want to apply some middleware so we should do it beforehand and pass that beforehand schema to
mongoose.model as we have done below. */
const userSchema = new mongoose.Schema({
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

/* For middleware we have pre() method for doing something before an event, and we have post() method for doing
something just after an event. The first argument is the name of the event, the second argument is the function to run.
The function needs to be a standard function and not an arrow function, because the 'this' binding plays an important
role. */
userSchema.pre('save', async function (next) {
  /* 'this' is equal to the document that is being saved. */
  const user = this;

  /* Mongoose provides us with the isModified() method we can use to determine if a certain field in the document is
  modified. In our case, it is the 'password' field.
   */
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  /* The whole point of this function is to run some code before a user is saved. But how does it know when we're done
  running our code? The answer might be: when the function is over, however, that would not account for any asynchronous
  process which might be occurring. So that is why 'next' is provided -- we simply call 'next' when we are done in the
  function. If we never call next(), it is going to hang forever thinking that we are still running some code before we
  actually save the user and it will never actually save the user. */
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;