// Load the module dependencies
const passport = require('passport');
const mongoose = require('mongoose');

// Define the Passport configuration method
module.exports = function () {
    // Load the 'Student' model
    const Student = mongoose.model('Student');

    // Use Passport's 'serializeStudent' method to serialize the student id
    passport.serializeStudnet((student, done) => {
        done(null, student.id);
    });

    // Use Passport's 'deserializeStudent' method to load the student document
    passport.deserializeStudent((id, done) => {
        Student.findOne({
            _id: id
        }, '-password -salt', (err, student) => {
            done(err, student);
        });
    });

    // Load Passport's strategies configuration files
    require('./strategies/local.js')();
    require('./strategies/twitter.js')();
    require('./strategies/facebook.js')();
    require('./strategies/google.js')();
};