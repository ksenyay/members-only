const get_login_form = (req, res) => {
  res.render("loginForm");
};

const get_signup_form = (req, res) => {
  res.render("signupForm");
};

module.exports = { get_login_form, get_signup_form };
