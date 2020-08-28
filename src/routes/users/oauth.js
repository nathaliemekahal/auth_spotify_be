const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("./schema");

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
        name: profile.name.givenName,
        surname: profile.name.familyname,
      };

      try {
        const user = userModel.findOne({ facebookId: profile.id });
        if (user) {
          done(null, user);
        } else {
          await userModel.create(newUser);
          done(null, newUser);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (student, done) {
  done(null, student);
});

passport.deserializeUser(function (student, done) {
  done(null, student);
});
