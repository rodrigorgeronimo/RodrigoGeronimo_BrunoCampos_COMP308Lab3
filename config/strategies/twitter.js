// Load the module dependencies
const passport = require('passport');
const url = require('url');
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('../config');
const students = require('../../app/controllers/students.server.controller');

// Create the Twitter strategy configuration method
module.exports = function () {
    // Use the Passport's Twitter strategy 
    passport.use(new TwitterStrategy({
        consumerKey: config.twitter.clientID,
        consumerSecret: config.twitter.clientSecret,
        callbackURL: config.twitter.callbackURL,
        passReqToCallback: true
    }, (req, token, tokenSecret, profile, done) => {
        // Set the studentNumber's provider data and include tokens
        const providerData = profile._json;
        providerData.token = token;
        providerData.tokenSecret = tokenSecret;

        // Create the student OAuth profile
        const providerStudentProfile = {
            fullName: profile.displayName,
            studentNumber: profile.studentNumber,
            provider: 'twitter',
            providerId: profile.id,
            providerData: providerData
        };

        // Save the student OAuth profile
        students.saveOAuthStudentProfile(req, providerStudentProfile, done);
    }
    ));
};