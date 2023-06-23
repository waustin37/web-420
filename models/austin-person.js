/*
============================================
; Title:  austin-person.js
; Author: William Austin
; Date:   June 23, 2023
; Description: Creates a Person Mongoose model that we can use for the Person API
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Creates the Schema we use within out Person to create multiple roles
let roleSchema = new Schema ({
    text: {type: String},
});


//Creates the Schema we use within out Person to create multiple dependents
let dependentSchema = new Schema ({
    firstName: {type: String},
    lastName: {type: String}
});


//The person model we will use and the Schema the data will follow
let personSchema = new Schema ({
    firstName: {type: String},
    lastName: {type: String},
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: {type: String}
})

//exporting our model 
module.exports = mongoose.model('Person', personSchema);
