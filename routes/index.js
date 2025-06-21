const { Router } = require("express");
const router = Router();
const authRouter = require("./auth");
const data = require("../utils/data");
const userData = require("../utils/users");
const User = require("../mongoose/schemas/users");

router.use(authRouter);

router.get("/", async (req, res) => {
  req.session.visited = true; // Mark session as visited
  res.cookie("subscribed", "true", {
    // Set a signed cookie valid for 1 hour
    maxAge: 60000 * 60,
    signed: true,
  });

  const users = await User.find();

  res.render("index", { postData: data, users: users });
});

module.exports = router;
