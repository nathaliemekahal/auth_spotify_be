const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("./schema");
const { authenticate } = require("../../middlewares/authTools");

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID:
        "572548750925-q15ltbc9552460lqvesgfhdjocohmvh4.apps.googleusercontent.com",
      clientSecret: "TMT9W2HjLP2Xk6ZbXUQfjZwC",
      callbackURL: "http://localhost:3232/user/facebookRedirect",
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        name: profile.name.givenName,
        surname: profile.name.familyName,
        email: profile.emails[0].value,
      };
      try {
        const user = userModel.findOne({ googleId: profile.id });
        if (user.name) {
          const token = authenticate(user);
          done(null, { user, token });
        } else {
          const createdUser = await userModel.create(newUser);
          const token = authenticate(createdUser);

          done(null, { user: createdUser, token });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
