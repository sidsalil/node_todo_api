const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 1,
    trim: true,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

var User = mongoose.model('User', UserSchema);

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access: access
  }, 'secret_salting_data').toString();
  user.tokens.push({
    access: access,
    token: token
  });

  return user.save().then(() => {
    return token;
  })
};

module.exports = {User: User}
