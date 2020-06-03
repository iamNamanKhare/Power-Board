const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    // done(null, user.id);
    done(null, user);
});

passport.deserializeUser(function(/*id*/ user, done) {
    // User.findById(id, function(err, user) {
        // done(err, user);
        done(null, user)
    // });
});

passport.use(new GoogleStrategy({
    clientID:  GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //  return done(err, user);
        return done(null, profile);
    // });
  }
));

module.exports = passport