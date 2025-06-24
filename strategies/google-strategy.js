const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const User = require("../mongoose/schemas/users");
require("dotenv").config();

// This one is used after done() is called in authorize function
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id); // Saves user into session
});

// id is what i pass in done() for serializeUser()
passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    return findUser ? done(null, findUser) : done(null, null);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: process.env.REDIRECT_URL_GOOGLE,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let findUser = await User.findOne({ googleId: profile.id });

        if (!findUser) {
          findUser = await User.create({
            username: profile.name.givenName.toLowerCase(),
            googleId: profile.id,
            avatarGoogle: profile.photos?.[0]?.value,
            authWith: "google",
          });
        }

        await User.findOneAndUpdate(
          { googleId: profile.id },
          { isLogged: true }
        );

        return done(null, findUser);
      } catch (err) {
        console.error("Error in Google strategy:", err);
        return done(err, null);
      }
    }
  )
);
