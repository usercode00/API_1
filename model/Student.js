const mongoose = require('mongoose');

const Student_Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['active','not-active'],
        default:'active'
    }
});

const student = mongoose.model('student',Student_Schema);

module.exports = student;
