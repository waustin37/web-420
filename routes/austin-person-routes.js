/*
============================================
; Title:  austin-person-routes.js
; Author: William Austin
; Date:   June 23, 2023
; Description: Creates a router for the Person API
;===========================================
*/

const express = require('express');
const router = express.Router();
const Person = require('../models/austin-person.js');

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Person
 *     description: API for returning an array of Person objects.
 *     summary: returns an array of composers in JSON format.
 *     responses:
 *       '200':
 *         description: Array of person documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get("/persons", async (req, res) => {
    try {
      Person.find({}, function (err, persons) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(persons);
          res.json(persons);
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
   * createPerson
   * @openapi
   * /api/persons:
   *   post:
   *     tags:
   *       - Person
   *     name: createPerson
   *     description: API for adding a new person document to MongoDB Atlas
   *     summary: Creates a new person document
   *     requestBody:
   *       description: Person information
   *       content:
   *         application/json:
   *           schema:
   *             required:
   *               - firstName
   *               - lastName
   *               - roles
   *               - dependents
   *               - birthDate
   *             properties:
   *              firstName:
   *                  type: string
   *              lastName:
   *                  type: string
   *              roles:
   *                  type: array
   *                  items: 
   *                    type: object
   *                    properties:
   *                        text:
   *                          type: string
   *              dependents:
   *                  type: array
   *                  items:
   *                     type: object
   *                     properties:
   *                        firstName:
   *                          type: string
   *                        lastName:
   *                           type: string
   *              birthDate:
   *                  type: string
   *     responses:
   *       '200':
   *         description: Student Added to MongoDB Atlas
   *       '500':
   *         description: Server Exception
   *       '501':
   *         description: MongoDB Exception
   */

    router.post("/persons", async (req, res) => {
        try {
          const newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles,
            dependents: req.body.dependents,
            birthDate: req.body.birthDate,
          };
      
          await Person.create(newPerson, function (err, person) {
            if (err) {
              console.log(err);
              res.status(501).send({
                message: `MongoDB Exception: ${err}`,
              });
            } else {
              console.log(person);
              res.json(person);
            }
          });
        } catch (e) {
          console.log(e);
          res.status(500).send({
            message: `Server Exception: ${e.message}`,
          });
        }
      });

module.exports = router; 