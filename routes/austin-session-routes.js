/*
============================================
; Title:  austin-session-routes.js
; Author: William Austin
; Date:   July 1, 2023
; Description: Creates a router for the Node Security API
;===========================================
*/

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/austin-user.js');

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

router.post('/signup', async (req, res) => {
    try {

        //Get everything we need from the user
      const { userName, password, emailAddress } = req.body;

       //Check to see if that user name is free
      const existingUser = await User.findOne({ userName });
  
      //If it's free, we encrypt the password and create the New User Document
      if (!existingUser) {
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const newRegisteredUser = {
          userName,
          password: hashedPassword,
          emailAddress,
        };
         User.create(newRegisteredUser, function (err, user) {
          if (err) {
            console.log(err);
            res.status(501).send({
              message: `MongoDB Exception: ${err}`,
            });
          } else {
            console.log(user);
            res.send({ message: 'Registered user.' });
          }
        });

        //If Username isn't free we display this error
      } else {
        res.status(401).send({ message: 'Username is already in use.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server Exception.' });
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

router.post('/login', async (req, res) => {
    try {

        //Get the info we need from the user
      const { userName, password } = req.body;

      //Check to see if that Username matches one in our collection 
      const user = await User.findOne({ userName });
  
      //If the username exists, we see if the password is valid
      if (user) {
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (passwordIsValid) {
          console.log('User logged in');
          res.status(200).send({ message: 'User logged in' });
        } else {
          console.log('Invalid username and/or password');
          res.status(401).send({ message: 'Invalid username and/or password' });
        }
      } else {
        res.status(401).send({ message: 'Invalid username and/or password' });
      }
    } catch (err) {
      console.log(err);
      if (err.name === 'MongoError') {
        res.status(501).send({ message: `MongoDB Exception: ${err}` });
      } else {
        res.status(500).send({ message: `Server Exception: ${err.message}` });
      }
    }
  });

module.exports = router;