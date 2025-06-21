const passport = require("passport");
const User = require("../mongoose/schemas/users");
const { hashPassword } = require("../utils/password");

const get_login_form = (req, res) => {
  res.render("loginForm");
};

const get_register_form = (req, res) => {
  res.render("signupForm");
};

const post_auth_user = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user) return res.sendStatus(401);
    console.log();

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
};

const post_create_user = async (req, res) => {
  console.log(req.body);
  const hashedPass = hashPassword(req.body.password);
  console.log(hashedPass);

  const newUser = new User({
    username: req.body.username.trim(),
    password: hashedPass,
  });

  try {
    const savedUser = await newUser.save();
    return res.redirect("/");
  } catch (err) {
    console.log(err);
  }

  res.sendStatus(200);
};

const get_logout = (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) res.sendStatus(400);
    res.redirect("/");
  });
};

module.exports = {
  get_login_form,
  get_register_form,
  post_auth_user,
  post_create_user,
  get_logout,
};
