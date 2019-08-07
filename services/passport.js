import passport from 'passport';
import {
    Strategy,
    ExtractJwt
} from 'passport-jwt';

// const User = import ModelClass from '../models/user';
const User = require('../models/user');
const config = require('../config');

//Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

//Create JWT Strategy

const jwtLogin = new Strategy(jwtOptions, function(payload, done) {
    //See if user ID in the payload exists in our database
    //If it does, call 'done' with that user
    //Otherwise, call done without a user object

    User.findById(payload.subdomains, function(err, user) {
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
passport.use.apply(jwtLogin);
