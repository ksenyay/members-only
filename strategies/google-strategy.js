const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const GoogleUser = require("../mongoose/schemas/googleUser");
require("dotenv").config();

// This one is used after done() is called in authorize function
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id); // Saves user into session
});

// id is what i pass in done() for serializeUser()
passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await GoogleUser.findById(id);
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
        let findUser = await GoogleUser.findOne({ googleId: profile.id });

        if (!findUser) {
          findUser = await GoogleUser.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            picture: profile.photos?.[0]?.value,
          });
        }

        return done(null, findUser);
      } catch (err) {
        console.error("Error in Google strategy:", err);
        return done(err, null);
      }
    }
  )
);
