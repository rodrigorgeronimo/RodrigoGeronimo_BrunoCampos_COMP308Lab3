﻿const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    courseCode: {
        type: String,
        trim: true,
        required: 'Course Code cannot be blank'
    },
    courseName: {
        type: String,
        default: '',
        trim: true,
        required: 'Course Name cannot be blank'
    },
    section: {
        type: String, default: '',
        trim: true,
        required: 'Section cannot be blank'
    },
    semester: {
        type: String, default: '',
        trim: true,
        required: 'Semester cannot be blank'
    }
});
mongoose.model('Course', CourseSchema);
