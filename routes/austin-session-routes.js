/*
============================================
; Title:  austin-session-routes.js
; Author: William Austin
; Date:   July 1, 2023
; Description: Creates a router for the Node Security API
;===========================================
*/

const express = require('express');
const User = require('../models/austin-user.js');
const bcrypt = require('bcryptjs');
const router = express.Router();

const saltRounds = 10;

/**
 * Signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - users
 *     description: API for signing up new users
 *     summary: Adds a new username to our user's collection.
 *     requestBody:
 *          description: User Information
 *          content:
 *              application/json:
 *                  schema:
 *                      required:
 *                        - userName
 *                        - Password
 *                        - emailAddress
 *                      properties:
 *                          userName:
 *                              type: string
 *                          Password
 *                              type: string
 *                          emailAddress:
 *                              type: string
 *     responses:
 *       '200':
 *         description: Registered User.
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.post("/signup", async (req, res) => {
    try {
        //Firstly, we want to ask the user for a desired Username and password
        User.findOne({userName: req.body.userName}, function (err, user){
            if (err) {
                res.status(501).send({
                    message: "MongoDB Exception",
                });
            } else {

                //If username is available we proceed with the rest of the 'user' creation 
                if(!user) {

                    // This will 'hash' our password with the bcrpyt module
                    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
                    const newRegisteredUser = {
                        userName: req.body.userName,
                        password: hashedPassword,
                        emailAddress: req.body.emailAddress,
                      };

                      //This acutally creates the user document for our collection 
                    User.create(newRegisteredUser, function (err, registeredUser) {
                        if (err) {
                          console.log(err);
                          res.status(501).send({
                            message: `MongoDB Exception: ${err}`,
                          });
                        } else {
                          console.log(registeredUser);
                          res.json(registeredUser);
                        }
                    }); 

                    //If user name is already in our collection and error message is received.
                } else {
                    res.status(401).send({
                        message: "Username is already in use.",
                    });
                }
            }
        });

        //If we catch any errors along the way, we deliver this message
    } catch (e) {
      console.log(e);
      res.status(500).send({
        message: `Server Exception: ${e.message}`,
      });
    }
  });


/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - users
 *     name: login
 *     summary: User login
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User has logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/login", async(req, res) => {
    try {
        //Search our Users collection to see if the user name entered matches one in the  collection
        User.findOne({userName: req.body.userName}, function(err, user){
            if (err) {
                res.status(501).send({
                    message: "MongoDB Exception",
                });
            } else {
                console.log(user.password);
                console.log(req.body.password);
                if (user) {

                    //Matches the password for the User document with the entered password
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                    if (passwordIsValid) {
                        res.status(200).send({
                            message: "User has logged in",
                        });
                    } else {
                        res.status(401).send({
                            message: "Invalid username and/or password",
                        });
                    }
                //If No username is found that matches the entered username
                } else {
                    res.status(401).send({
                        message: "Invalid username and/or password",
                    });
                }
            }
        });
    } catch (e) {
        res.status(500).send({
            message: "Server Exception",
        });
    }
});

module.exports = router;