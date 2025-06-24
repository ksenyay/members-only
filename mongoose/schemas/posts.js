const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  posted: {
    type: String,
    required: true,
  },
  displayDate: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
    required: true,
  },
  likedBy: {
    type: [String],
    default: [],
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
