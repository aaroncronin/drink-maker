const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
require('../db.js')
const User = mongoose.model('User')


module.exports = function(passport) {
    
    /*
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })
    */
    passport.use('local-signup', new LocalStrategy({
        
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        
        process.nextTick(function() {
            User.findOne({'local.username': username}, function(err, user) {
                console.log(user)
                if (err) {
                    
                    return done(err);
                    
                }
                if (user) {
                    console.log('in use')
                    return done(null, false, console.log('already in use'))
                } else {
                    console.log('NADFODSLJ')
                }
            })
        })
    }
    ))
}