// Load the module dependencies
const Student = require('mongoose').model('Student');
const passport = require('passport');

// Create a new error handling controller method
const getErrorMessage = function (err) {
    // Define the error message variable
    let message = '';

    // If an internal MongoDB error occurs get the error message
    if (err.code) {
        switch (err.code) {
            // If a unique index error occurs set the message error
            case 11000:
            case 11001:
                message = 'Student already exists';
                break;
            // If a general error occurs set the message error
            default:
                message = 'Something went wrong';
        }
    } else {
        // Grab the first error message from a list of possible errors
        for (const errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    // Return the message error
    return message;
};

// Create a new controller method that signin students
exports.signin = function (req, res, next) {
    passport.authenticate('local', (err, student, info) => {
        if (err || !student) {
            res.status(400).send(info);
        } else {
            // Remove sensitive data before login
            student.password = undefined;
            student.salt = undefined;

            // Use the Passport 'login' method to login
            req.login(student, (err) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(student);
                }
            });
        }
    })(req, res, next);
};

// Create a new controller method that creates new 'regular' students
exports.signup = function (req, res) {
    const student = new Student(req.body);
    student.provider = 'local';

    // Try saving the Student
    student.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Remove sensitive data before login
            student.password = undefined;
            student.salt = undefined;

            // Login the student
            req.login(student, function (err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(student);
                }
            });
        }
    });
}

// Create a new controller method that creates new 'OAuth' students
exports.saveOAuthStudentProfile = function (req, profile, done) {
    // Try finding a student document that was registered using the current OAuth provider
    Student.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, (err, student) => {
        // If an error occurs continue to the next middleware
        if (err) {
            return done(err);
        } else {
            // If a student could not be found, create a new student, otherwise, continue to the next middleware
            if (!student) {
                // Set a possible base username
                const possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

                // Find a unique available username
                Student.findUniqueUsername(possibleUsername, null, (availableUsername) => {
                    // Set the available user name 
                    profile.username = availableUsername;

                    // Create the student
                    student = new Student(profile);

                    // Try saving the new student document
                    student.save(function (err) {
                        // Continue to the next middleware
                        return done(err, student);
                    });
                });
            } else {
                // Continue to the next middleware
                return done(err, student);
            }
        }
    });
};

// Create a new controller method for signing out
exports.signout = function (req, res) {
    // Use the Passport 'logout' method to logout
    req.logout();

    // Redirect the student back to the main application page
    res.redirect('/');
};
//uses the Passport-initiated req.
//isAuthenticated() method to check whether a student is currently authenticated
exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'Student is not logged in'
        });
    }
    next();
};
//

