/*
============================================
; Title:  austin-customer.js
; Author: William Austin
; Date:   July 7, 2023
; Description: Customer Mongoose model
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Builds one of our Schemas, defining what is necessary to create a Line Item
let lineItemSchema = new Schema ({
    name: {type: String},
    price: {type: Number},
    quantity: {type: Number},
});

//Builds another one of our Schemas, defining what is necessary to create an Invoice
let invoiceSchema = new Schema ({
    subtotal: {type: Number},
    tax: {type: Number},
    dateCreated: {type: String},
    dateShipped: {type:String},
    lineItems: [lineItemSchema],
});

//Builds our final Schema, defining what is necessary to create a Customer
let customerSchema = new Schema ({
    firstName: {type: String},
    lastName: {type: String},
    userName: {type: String},
    invoices: [invoiceSchema],
});

//Exports our Module for use elsewhere
module.exports = mongoose.model('Customer', customerSchema);
