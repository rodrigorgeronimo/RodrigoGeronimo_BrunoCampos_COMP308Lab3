const mongoose = require('mongoose');
const Course = mongoose.model('Course');
//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const course = new Course(req.body);
    course.creator = req.student;
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//
exports.list = function (req, res) {
    Course.find().sort('-created').populate('creator', 'firstName lastName fullName').exec((err, courses) => {
if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
    res.status(200).json(courses);
    }
});
};
//
exports.courseByID = function (req, res, next, id) {
    Course.findById(id).populate('creator', 'firstName lastName fullName').exec((err, course) => {if (err) return next(err);
        if (!course) return next(new Error('Failed to load course '
        + id));
        req.course = course;
    next();
});
};
//
exports.read = function (req, res) {
    res.status(200).json(req.course);
};
//
exports.update = function (req, res) {
    const course = req.course;
    course.title = req.body.title;
    course.content = req.body.content;
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//
exports.delete = function (req, res) {
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//The hasAuthorization() middleware uses the req.course and req.student objects
//to verify that the current student is the creator of the current course
exports.hasAuthorization = function (req, res, next) {
    if (req.course.creator.id !== req.student.id) {
        return res.status(403).send({
            message: 'Student is not authorized'
        });
    }
    next();
};


