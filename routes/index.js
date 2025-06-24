const { Router } = require("express");
const router = Router();
const authRouter = require("./auth");
const postsRouter = require("./posts");
const googleRouter = require("./googleAuth");

const convertDate = require("../utils/dateConverter");

// Data
const User = require("../mongoose/schemas/users");
const Post = require("../mongoose/schemas/posts");

router.use(authRouter);
router.use(postsRouter);
router.use(googleRouter);

router.get("/", async (req, res) => {
  req.session.visited = true;

  res.cookie("subscribed", "true", {
    maxAge: 600000 * 60, // 1 hour
    signed: true,
  });

  try {
    const users = await User.find();
    const posts = await Post.find().sort({ posted: -1 }).lean();

    posts.forEach((post) => {
      post.displayDate = convertDate(post.posted);
    });

    const currentUser = req.user?.username;

    const usersWithImages = users.map((user) => {
      let profileImage = null;

      if (user.avatar?.data && user.avatar?.contentType) {
        const base64 = user.avatar.data.toString("base64");
        profileImage = `data:${user.avatar.contentType};base64,${base64}`;
      }

      return {
        username: user.username,
        profileImage,
        authWith: user.authWith,
        avatarGoogle: user.avatarGoogle,
      };
    });

    // Attach isLiked field to each post
    const postData = posts.map((post) => ({
      ...post,
      isLiked: post.likedBy?.includes(currentUser),
    }));

    res.render("index", {
      postData,
      users: usersWithImages,
      currentUser: req.user, // Pass current user to EJS
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Failed to load users");
  }
});

module.exports = router;
