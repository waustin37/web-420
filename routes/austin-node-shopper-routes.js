/*
============================================
; Title:  austin-node-shopper-routes.js
; Author: William Austin
; Date:   July 7, 2023
; Description: Creates a router for the Node Shopper API
;===========================================
*/

const express = require('express');
const router = express.Router();
const Customer = require('../models/austin-customer.js');

    /**
   * createCustomer
   * @openapi
   * /api/customers:
   *   post:
   *     tags:
   *       - Customers
   *     name: createCustomer
   *     description: API for adding a new customer document to MongoDB Atlas
   *     summary: Creates a new customer document
   *     requestBody:
   *       description: Customer Information
   *       content:
   *         application/json:
   *           schema:
   *             required:
   *               - firstName
   *               - lastName
   *               - userName
   *             properties:
   *              firstName:
   *                  type: string
   *              lastName:
   *                  type: string
   *              userName:
   *                  type: string
   *     responses:
   *       '200':
   *         description: Customer Added to MongoDB
   *       '500':
   *         description: Server Exception
   *       '501':
   *         description: MongoDB Exception
   */

    router.post("/customers", async (req, res) => {
        try {
          const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
          };
          await Customer.create(newCustomer, function (err, customer) {
            if (err) {
              console.log(err);
              res.status(501).send({
                message: `MongoDB Exception: ${err}`,
              });
            } else {
              console.log(customer);
              res.json(customer);
            }
          });
        } catch (e) {
          console.log(e);
          res.status(500).send({
            message: `Server Exception: ${e.message}`,
          });
        }
      });

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     description: This API will create a new invoice for the username provided
 *     summary: Provide your username and create a new invoice for that username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Customer's Username
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          price:
 *                              type: number
 *                          quantity:
 *                              type: number
 *     responses:
 *       '200':
 *         description: Invoice Added to User
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

    router.post("/customers/:userName/invoices", async (req, res) => {
        try {
            await Customer.findOne({userName: req.params.userName},function(err, customer) {
                const newInvoice = {
                    subtotal: req.body.subtotal,
                    tax: req.body.tax,
                    dateCreated: req.body.dateCreated,
                    dateShipped: req.body.dateShipped,
                    lineItems: req.body.lineItems
                };
                if (err) {
                    console.log(err);
                    res.status(501).send({
                        'message': `MongoDB Exception: ${err}`
                    })
                } else {
                    customer.invoices.push(newInvoice);
                    customer.save(function (err, customer){
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(customer);
                            res.json(customer);
                        }
                    });
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).send ({
                message: `Server Exception: ${e.message}`,
            });
        }
    });


/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     name: findAllInvoicesByUserName
 *     description: This API will find all the invoices attached to a particular UserName
 *     summary: Finds all invoices under a username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Customer's Username
 *         schema:
 *           type: string
 *   responses:
 *       '200':
 *         description: All Invoices for User
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

    router.get("/customers/:userName/invoices", async (req, res) => {
        try {
            Customer.findOne({ userName: req.params.userName}, function(err, customer){
                if(err) {
                    console.log(err);
                    res.status(501).send({
                        message: `MongoDB Exception: ${err}`,
                    });
                } else {
                    console.log(customer);
                    res.json(customer);
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).send({
                message: `Server Exception: ${e.message}`,
            });
        }
    });

    //Exports out router 
    module.exports = router;