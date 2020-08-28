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
        email: profile.emails[0].value,
      };

      try {
        console.log("trying!!!!!!");
        const user = userModel.findOne({ googleId: profile.id });
        console.log("USER", user);
        if (user.name) {
          done(null, user);
        } else {
          console.log("NOTUSER", user);
          const createdUser = await userModel.create(newUser);

          done(null, createdUser);
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
