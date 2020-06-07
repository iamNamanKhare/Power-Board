const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')

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
    clientID: keys.google.ClientId,
    clientSecret: keys.google.ClientSecret,
    callbackURL: "http://localhost:4000/auth/google/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //  return done(err, user);
        return done(null, profile);
    // });
  }
));

module.exports = passport