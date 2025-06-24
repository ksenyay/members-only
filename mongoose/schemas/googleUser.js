const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: String,
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
});

const GoogleUser = mongoose.model("google-user", googleUserSchema);

module.exports = GoogleUser;
