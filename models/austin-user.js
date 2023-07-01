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

let userSchema = new Schema ({
    userName: {type: String},
    Password: {type: String},
    emailAddress: []
})

module.exports = mongoose.model('User', userSchema);