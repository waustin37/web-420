/*
============================================
; Title:  austin-team-routes.js
; Author: William Austin
; Date:   July 22, 2023
; Description: Creates a router for the Teams API
;===========================================
*/

const express = require('express');
const router = express.Router();
const Team = require('../models/austin-team');

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Team
 *     description: API for returning an array of Team objects.
 *     summary: Shows all Teams in the Database.
 *     responses:
 *       '200':
 *         description: Array of Team documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get("/teams", async (req, res) => {
    try {
      Team.find({}, function (err, teams) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(teams);
          res.json(teams);
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
   * assignPlayerToTeam
   * @openapi
   * /api/teams/{teamId}/players:
   *    post:
   *        tags:
   *            - Team
   *        name: assignPlayerToTeam
   *        description: Creates a new player and places him in a Team based on teamId
   *        summary: Assign a new Player to a Team
   *        parameters:
   *         - name: teamId
   *           in: path
   *           required: true
   *           description: teamId
   *           schema:
   *             type: string
   *        requestBody:
   *           description: Player Information
   *           content:
   *                application/json:
   *                  schema:
   *                    required:
   *                      - firstName
   *                      - lastName
   *                      - salary
   *                    properties:
   *                      firstName:
   *                        type: string
   *                      lastName:
   *                        type: string
   *                      salary:
   *                        type: number
   *        responses:
   *            '200':
   *               description: Player Document 
   *            '401':
   *               description: Invalid TeamId
   *            '500':
   *               description: Server Exception
   *            '501':
   *               description: MongoDB Exception
   */

  router.post("/teams/:teamId/players", async (req, res) => {
    try{
        await Team.findOne({teamId: req.params.teamId}, function(err, team){
            let newPlayer = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                salary: req.body.salary
            };
            if (err) {
                console.log(err);
                res.status(501).send({
                    message: `MongoDB Exception: ${err}`
                })
            } else {
                team.players.push(newPlayer);
                team.save(function (err, team){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(team);
                        res.json(team);
                    }
                });
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: `Server Exception: ${e.message}`
        });
    }
  });

  /**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{teamId}/players:
 *   get:
 *     tags:
 *       - Team
 *     name: findAllPlayersByTeamId
 *     description: Enter a Team Id and see all the players on that Team
 *     summary: Finds all players under a teamId
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         description: Team's ID number
 *         schema:
 *           type: string
 *   responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

  router.get("/teams/:teamId/players", async (req, res) => {
    try {
        Team.findOne({teamId: req.params.teamId}, function(err, players){
            if(err) {
                console.log(err);
                res.status(501).send({
                    message: `MongoDB Exception: ${err}`,
                });
            } else {
                console.log(players);
                res.json(players);
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
   * deleteTeamById
   * @openapi
   * /api/teams/{teamId}:
   *   delete:
   *     tags:
   *       - Team
   *     name: deleteTeamById
   *     description: Enter a TeamId to delete the Team from the database 
   *     summary: Deletes Team
   *     parameters:
   *        - name: teamId
   *          in: path
   *          required: true
   *          description: Team Id
   *          schema:
   *            type: string
   *     responses:
   *       '200':
   *         description: Team Deleted
   *       '401':
   *         description: Invalid teamId
   *       '500':
   *         description: Server Exception
   *       '501':
   *         description: MongoDB Exception
   */

    router.delete("/teams/:teamId", async (req, res) => {
        try {
          await Team.findOneAndDelete({teamId: req.params.teamId}, function(err, team){
            if (err) {
              console.log(err);
              res.status(501).send({
                'message':`MongoDB Exception: ${err}`
              })
            } else {
              console.log(team);
              res.json(team);
            }
          })
        } catch (e) {
          console.log(e);
          res.status(500).send({
            'message':`Server Exception: ${e.message}`
          })
        }
      })

//Exports our router 
module.exports = router;