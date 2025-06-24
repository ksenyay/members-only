const passport = require("passport");
const User = require("../mongoose/schemas/users");
const { hashPassword } = require("../utils/password");

// For processing photos
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  validationResult,
  checkSchema,
  matchedData,
} = require("express-validator");
const userValidationSchema = require("../utils/userValidationSchema");

const get_login_form = (req, res) => {
  res.render("loginForm");
};

const get_register_form = (req, res) => {
  res.render("signupForm");
};

const post_auth_user = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      req.flash("error", info?.message || "Unauthorized");
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
};

const post_create_user = [
  upload.single("avatar"),
  checkSchema(userValidationSchema),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) return res.send(result.array());

    const data = matchedData(req);

    const hashedPass = hashPassword(data.password);

    const newUser = new User({
      username: data.username.toLowerCase(),
      password: hashedPass,
      authWith: "local",
    });
    if (req.file) {
      newUser.avatar = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    try {
      await newUser.save();
      res.redirect("/login");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error saving user", err);
    }
  },
];

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
