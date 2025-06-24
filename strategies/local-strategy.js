const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../mongoose/schemas/users");
const { comparePasswords, hashPassword } = require("../utils/password");
const session = require("express-session");

// Store user ID in session
passport.serializeUser((user, done) => {
  done(null, user.id); // Save only the user ID in the session
});

// Retrieve full user from session by ID
passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id); // Get full user from DB
    if (!findUser) throw new Error("User is not found");
    done(null, findUser); // Attach user to req.user
  } catch (err) {
    done(err, null);
  }
});

// Define local login strategy (username + password)
module.exports = passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username });

      if (!findUser) return done(null, false, { message: "User not found" });

      const isValid = await comparePasswords(password, findUser.password);
      if (!isValid) return done(null, false, { message: "Incorrect password" });

      await User.findOneAndUpdate({ username }, { isLogged: true });

      return done(null, findUser);
    } catch (err) {
      return done(err);
    }
  })
);
