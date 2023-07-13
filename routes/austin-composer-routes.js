const express = require('express');
const router = express.Router();
const Composer = require('../models/austin-composer.js');

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an array of composer objects.
 *     summary: returns an array of composers in JSON format.
 *     responses:
 *       '200':
 *         description: Array of composer documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get("/composers", async (req, res) => {
    try {
      Composer.find({}, function (err, composers) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(composers);
          res.json(composers);
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
   * findComposerById
   * @openapi
   * /api/composers/{id}:
   *   get:
   *     tags:
   *       - Composers
   *     description:  API for returning a composer document
   *     summary: returns a composer document
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Composer document id
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Composer document
   *       '500':
   *         description: Server exception
   *       '501':
   *         description: MongoDB Exception
   */
  
  router.get("/composers/:id", async (req, res) => {
    try {
      Composer.findOne({ _id: req.params.id }, function (err, composer) {
        if (err) {
          console.log(err);
          res.status(500).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(composer);
          res.json(composer);
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
   * createComposer
   * @openapi
   * /api/composers:
   *   post:
   *     tags:
   *       - Composers
   *     name: createComposer
   *     description: API for adding a new composer document to MongoDB Atlas
   *     summary: Creates a new composer document
   *     requestBody:
   *       description: Composer information
   *       content:
   *         application/json:
   *           schema:
   *             required:
   *               - firstName
   *               - lastName
   *             properties:
   *              firstName:
   *                  type: string
   *              lastName:
   *                  type: string
   *     responses:
   *       '200':
   *         description: Composer document
   *       '500':
   *         description: Server Exception
   *       '501':
   *         description: MongoDB Exception
   */
  
  router.post("/composers", async (req, res) => {
    try {
      const newComposer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
  
      await Composer.create(newComposer, function (err, composer) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(composer);
          res.json(composer);
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
   * updateComposerById
   * @openapi
   * /api/composers/{id}:
   *   put:
   *     tags:
   *       - Composers
   *     name: updateComposerById
   *     description: API for updating an existing composer document to MongoDB Atlas
   *     summary: Update Composer
   *     parameters:
   *        - name: id
   *          in: path
   *          required: true
   *          description: Composer Id
   *          schema:
   *            type: string
   *     requestBody:
   *       description: Composer information
   *       content:
   *         application/json:
   *           schema:
   *             required:
   *               - firstName
   *               - lastName
   *             properties:
   *              firstName:
   *                  type: string
   *              lastName:
   *                  type: string
   *     responses:
   *       '200':
   *         description: Array of Composer Documents
   *       '401':
   *         Invalid Composer Id
   *       '500':
   *         description: Server Exception
   *       '501':
   *         description: MongoDB Exception
   */

  router.put("/composers/:id", async (req, res) => {
    try {
      await Composer.findOne({_id: req.params.id}, function(err, composer) {
        if (composer) {
          console.log(composer);
          composer.set({
            firstName: req.body.firstName,
            lastName: req.body.lastName
          });
          composer.save(function(err, updatedComposer){
            if(err) {
              console.log(err);
              res.json(updatedComposer);
            } else {
              console.log(updatedComposer);
              res.json(updatedComposer);
            }
          })
        } if (!composer) {
          res.status(401).send ({
            'message': `Invalid Composer Id`
          })
        }
      })
    } catch (e) {
      console.log(e);
      res.status(500).send ({
          message: `Server Exception: ${e.message}`,
        });
      }
  });

    /**
   * deleteComposerById
   * @openapi
   * /api/composers/{id}:
   *   delete:
   *     tags:
   *       - Composers
   *     name: deleteComposerById
   *     description: API for deleting an existing composer document on MongoDB Atlas
   *     summary: Deletes Composer
   *     parameters:
   *        - name: id
   *          in: path
   *          required: true
   *          description: Composer Id
   *          schema:
   *            type: string
   *     responses:
   *       '200':
   *         description: Composer Deleted
   *       '500':
   *         description: Server Exception
   *       '501':
   *         description: MongoDB Exception
   */

router.delete("/composers/:id", async (req, res) => {
  try {
    await Composer.findByIdAndDelete({_id: req.params.id}, function(err, composer){
      if (err) {
        console.log(err);
        res.status(501).send({
          'message':`MongoDB Exception: ${err}`
        })
      } else {
        console.log(composer);
        res.json(composer);
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'message':`Server Exception: ${e.message}`
    })
  }
})
  module.exports = router; 
  