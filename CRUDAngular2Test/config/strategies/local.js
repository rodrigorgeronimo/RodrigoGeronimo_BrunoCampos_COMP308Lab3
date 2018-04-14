// Load the module dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Student = require('mongoose').model('Student');

// Create the Local strategy configuration method
module.exports = function () {
    // Use the Passport's Local strategy 
    passport.use(new LocalStrategy(function (username, password, done) {
        // Use the 'Student' model 'findOne' method to find a student with the current username
        Student.findOne({
            studentNumber: studentNumber
        }, (err, student) => {
            // If an error occurs continue to the next middleware
            if (err) {
                return done(err);
            }

            // If a student was not found, continue to the next middleware with an error message
            if (!student) {
                return done(null, false, {
                    message: 'Unknown student'
                });
            }

            // If the passport is incorrect, continue to the next middleware with an error message
            if (!student.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

            // Otherwise, continue to the next middleware with the student object
            return done(null, student);
        });
    }));
};