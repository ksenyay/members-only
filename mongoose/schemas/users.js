const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isLogged: Boolean,
});

const User = mongoose.model("chat-users", userSchema);

module.exports = User;
