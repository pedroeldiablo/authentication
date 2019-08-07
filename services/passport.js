import passport from 'passport';
import LocalStrategy from 'passport-local';
// import {
//     Strategy,
//     ExtractJwt
// } from 'passport-jwt';
import ModelClass from '../models/user';

const User = ModelClass;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// const User = import ModelClass from '../models/user';
const config = require('../config');

//Create local strategy
const localOptions = {
    usernameField: 'email'
};
const localLogin = new LocalStrategy(localOptions, function(
    email,
    password,
    done,
) {
    //Verify email and passsword otherwise, call done with false
    User.findOne({
        email: email
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }

        //Compare password - is password  = password?
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
});

//Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret,
};

//Create JWT Strategy

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    //See if user ID in the payload exists in our database
    //If it does, call 'done' with that user
    //Otherwise, call done without a user object

    User.findById(payload.sub, function(err, user) {
        //If error in process
        if (err) {
            return done(err, false);
        }
        //If user
        if (user) {
            done(null, user);
        }
        //If user not found
        else {
            done(null, false);
        }
    });
});

//Tell Passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
