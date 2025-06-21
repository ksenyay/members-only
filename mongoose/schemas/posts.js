const mongoose = require("mongoose");

const postSchema = {
  title: {
    type: String,
    required: true,
  },
  posted: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  user: {
    username: String,
    id: String,
  },
};

const Post = mongoose.model("post", postSchema);
module.exports = Post;
