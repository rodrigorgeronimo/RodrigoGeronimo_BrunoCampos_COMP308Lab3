// Load the module dependencies
const passport = require('passport');
const url = require('url');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config');
const students = require('../../app/controllers/students.server.controller');

// Create the Google strategy configuration method
module.exports = function () {
    // Use the Passport's Google strategy 
    passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        passReqToCallback: true
    },
        (req, accessToken, refreshToken, profile, done) => {
            // Set the student's provider data and include tokens
            const providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            // Create the studentNumber OAuth profile
            const providerStudentProfile = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                fullName: profile.displayName,
                email: profile.emails[0].value,
                studentNumber: profile.studentNumber,
                provider: 'google',
                providerId: profile.id,
                providerData: providerData
            };

            // Save the studentNumber OAuth profile
            students.saveOAuthStudentProfile(req, providerStudentProfile, done);
        }
    ));
};