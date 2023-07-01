/*
============================================
; Title:  austin-user.js
; Author: William Austin
; Date:   July 1, 2023
; Description: User Mongoose model
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Builds our Schema, defining what is necessary to create a New User
let userSchema = new Schema ({
    userName: {type: String},
    password: {type: String},
    emailAddress: {type: Array},
});

//Exports our Module for use elsewhere
module.exports = mongoose.model('User', userSchema);