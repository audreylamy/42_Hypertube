const passport = require('passport');
const Cookies = require('cookies');
const passportConfig = require('../services/passport');
const Users = require('../models/users.model');

exports.local = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({
                message: info.message
            });
        } else {
            // Double security auth with jwt and http only cookies
            var token = user.createJwtToken(user);
            new Cookies(req,res).set('access_token', token['jwtToken'], {
                httpOnly: true,
                // secure: true
            });
            res.status(200).json({
                xsrfToken : token['xsrfToken'],
                user : user.toJSON()
            });
        }
    })(req, res);
}

exports.facebook = (req, res) => {
    passport.authenticate('facebook', { failureRedirect: '/' }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                message: 'Errors with your Facebook login credentials'
            });
        } else {
            var token = user.createJwtToken(user);
            new Cookies(req,res).set('access_token', token['jwtToken'], {
                httpOnly: true,
                // secure: true
            });
            // new Cookies(req,res).set('xsrfToken', token['xsrfToken'], {httpOnly: false});
            // new Cookies(req,res).set('user', user, {httpOnly: false});
            res.status(200).json({
                xsrfToken : token['xsrfToken'],
                user : user.toJSON()
            });
            res.redirect(`http://localhost:3000/homepage`);
        }
    })(req, res);
}

exports.google = (req, res) => {


}

exports.twitter = (req, res) => {


}

exports.linkedin = (req, res) => {


}

exports.github = (req, res) => {


}

exports.fortytwo = (req, res) => {


}