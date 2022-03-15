const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please inform your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please inform your e-mail'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please inform a valid e-mail'],
  },
  photo: {
    type: String,
    //required: [true, 'A user must have a photo'],
  },
  password: {
    type: String,
    required: [true, 'Please inform a password'],
    minlength: 8,
    //validate: [validator.isAlpha, 'User password must only contain characters'],
  },
  passwordConfirm: {
    type: Number,
    required: [true, 'Please confirm your password'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
