const { Router } = require("express");
const router = Router();
const authRouter = require("./auth");
const postsRouter = require("./posts");
const data = require("../utils/data");
const User = require("../mongoose/schemas/users");

router.use(authRouter);
router.use(postsRouter);

router.get("/", async (req, res) => {
  req.session.visited = true;

  res.cookie("subscribed", "true", {
    maxAge: 60000 * 60, // 1 hour
    signed: true,
  });

  try {
    const users = await User.find();

    const usersWithImages = users.map((user) => {
      let profileImage = null;

      if (user.avatar?.data && user.avatar?.contentType) {
        const base64 = user.avatar.data.toString("base64");
        profileImage = `data:${user.avatar.contentType};base64,${base64}`;
      }

      return {
        username: user.username,
        profileImage,
      };
    });

    res.render("index", {
      postData: data,
      users: usersWithImages,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Failed to load users");
  }
});

module.exports = router;
