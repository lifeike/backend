const express = require("express")
const router = express.Router()
const path = require("path")
const movieController = require("@/controllers/movie")
const verify = require("@/middlewares/authVerify")
const db = require("@/config/db/mongoDB")
const { ObjectID, ObjectId } = require("bson")

//get all movies
/**
 * @openapi
 * /api/v1/moives:
 *   get:
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/", movieController.getAllMovies)
//get one movie
router.get("/:id", verify, movieController.getOneMovie)
//careate one movie
router.post("/", verify, movieController.createMovie)
//upodate one movie
router.put("/:id", verify, movieController.updateMovie)
//delete one movie
router.delete("/:id", verify, movieController.deleteMovie)

module.exports = router
