const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    // validate: [
    //   validator.isStrongPassword,
    //   'Message for strong password',
    // ],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  // Will run if the password was modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
