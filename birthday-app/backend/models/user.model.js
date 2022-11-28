const mongoose = require('mongoose');
var uniqueValidator = require('validate-mongoose-unique');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "can't be blank"],
        lowercase: true,
        minlength: [3, "Too few characters!"],
        maxlength: [15, "Too many characters!"],
        index: true
    },
    userEmail: {
        type: String,
        required: [true, "Can't be blank"],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Email address is invalid'],
        index: true
    },
    password: {
        type: String,
        required: [true, "can't be blank"],
        // minlength: [8, "Too few characters!"],
        // maxlength: [30, "Too many characters!"],
    },
    refreshToken: String
} , {timestamps: true} );

UserSchema.index({
    userId: 1
  });
  
// General message for security measures 
UserSchema.plugin(uniqueValidator, {message: 'This account already exists.'});

module.exports = mongoose.model('User', UserSchema);