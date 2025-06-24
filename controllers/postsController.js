const Post = require("../mongoose/schemas/posts");

const post_create = async (req, res) => {
  console.log("Incoming post content:", req.body);
  console.log(req.user);

  const newPost = new Post({
    posted: new Date(),
    description: req.body.content,
    username: req.user.username,
  });

  try {
    await newPost.save();
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error saving user");
  }
};

const post_likes = async (req, res) => {
  if (!req.user) return res.sendStatus(401);

  try {
    const post = await Post.findById(req.body.postId);
    if (!post) return res.sendStatus(404);

    const username = req.user.username;
    const alreadyLiked = post.likedBy.includes(username);

    if (alreadyLiked) {
      post.likes -= 1;
      post.likedBy = post.likedBy.filter((u) => u !== username);
      await post.save();
      return res.status(200).json({ liked: false, likes: post.likes });
    } else {
      post.likes += 1;
      post.likedBy.push(username);
      await post.save();
      return res.status(200).json({ liked: true, likes: post.likes });
    }
  } catch (err) {
    console.error("Error updating like:", err);
    res.sendStatus(500);
  }
};

module.exports = { post_create, post_likes };
