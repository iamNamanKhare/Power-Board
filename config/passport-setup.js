const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../model/user-model')
require('dotenv').config()

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    }).catch((err) => {
        done(err, false)
    })
})

passport.use(new GoogleStrategy({
        clientID: process.env.ClientId,
        clientSecret: process.env.ClientSecret,
        callbackURL: "http://localhost:4000/auth/google/redirect"
    },(accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}) 
            .then((currentUser) => {
                if(currentUser){
                    //already a user
                    console.log('User is : ' + currentUser)
                    done(null, currentUser)
                } else {
                //if not, create a user in our db
                    new User({
                        username: profile.displayName,
                        googleId: profile.id,
                        thumbnail: profile._json.picture
                    })
                    .save()
                    .then((newUser) => {
                        console.log('New User Created : ' + newUser)
                        done(null, newUser)
                    })
                    .catch((err) => {
                        console.log("Some Error while saving New user")
                        done(err, false)
                    })
                }
            }).catch((err) => {
                done(err, false)
            })  
    }
))

module.exports = passport