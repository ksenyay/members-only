const { Router } = require("express");
const router = Router();
const authRouter = require("./auth");
const data = require("../utils/data");
const userData = require("../utils/users");

router.use(authRouter);

router.get("/", (req, res) => {
  req.session.visited = true; // Mark session as visited
  res.cookie("subscribed", "true", {
    // Set a signed cookie valid for 1 hour
    maxAge: 60000 * 60,
    signed: true,
  });

  res.render("index", { postData: data, subscribed: false, users: userData });
});

module.exports = router;
