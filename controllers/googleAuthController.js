const passport = require("passport");

const get_google_auth = (req, res) => {
  passport.authenticate("google", { scope: ["profile"] });
};

const get_google_redirect = [
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/");
  },
];

module.exports = { get_google_auth, get_google_redirect };
