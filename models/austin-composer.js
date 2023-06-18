/*
============================================
; Title:  austin-composer.js
; Author: William Austin
; Date:   June 18, 2023
; Description: Composer Mongoose model
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let composerSchema = new Schema ({
    firstName: {type: String},
    lastName: {type: String}
})

module.exports = mongoose.model('Composer', composerSchema);
