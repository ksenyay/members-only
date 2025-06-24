const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  avatar: {
    data: Buffer,
    contentType: String,
  },
  avatarGoogle: String,
  isLogged: Boolean,
  googleId: {
    type: String,
    required: false,
    unique: true,
  },
  authWith: { type: String, required: true },
});

const User = mongoose.model("chat-users", userSchema);

module.exports = User;
