const md5 = require('md5')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var Users = require('../models').Users

module.exports = function (app) {
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })
    passport.deserializeUser(function (id, done) {
        Users.findById(id, function (err, user) {
            done(null, user)
        })
    })
    passport.use(new LocalStrategy(
        function (username, password, done) {
            var password = md5(password)
            Users.findOne({ name: username, password: password }, function (err, user) {
                if (err) {
                    return done(null, false, { message: 'Login Error' })
                }
                if (!user) {
                    return done(null, false)
                }
                return done(null, user)
            })
        }
    ))
}
