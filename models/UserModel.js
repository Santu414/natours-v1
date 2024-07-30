const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail
      , "Please enter valid email ID"]
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "COnfirm Password is required"],
  },
});

// Pre-save hook to hash the password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next(); 
  try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Hash the password using the salt
      this.password = await bcrypt.hash(this.password, salt);

      // Delete confirm password
      this.passwordConfirm = undefined
      next();
  } catch (error) {
      next(error);
  }
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
