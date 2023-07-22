/*
============================================
; Title:  austin-team.js
; Author: William Austin
; Date:   June 22, 2023
; Description: Player Schema and Team Model for WEB 420 
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Creates our Player Schema that we can export to use in our API
let playerSchema = new Schema ({
    firstName: {type: String},
    lastName: {type: String},
    salary: {type: Number}
})

let teamSchema = new Schema ({
    name: {type:String},
    mascot: {type: String},
    teamId: {type: String},
    players: [playerSchema]
})



//Exports out Schema for use elsewhere
module.exports = mongoose.model('Team', teamSchema);