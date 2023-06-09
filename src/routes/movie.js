const express = require("express")
const router = express.Router()
const path = require("path")
const movieController = require("@/controllers/movie")
const verify = require("@/middlewares/authVerify")
const db = require("@/config/db/mongoDB")
const { ObjectID, ObjectId } = require("bson")

//get all movies
router.get("/", movieController.getAllMovies)

//get one movie
router.get("/:id", verify, movieController.getOneMovie)

//careate one movie
router.post("/", verify, movieController.createMovie)

//upodate one movie
router.put("/:id", verify, movieController.updateMovie)

router.delete("/:id", verify, movieController.deleteMovie)

module.exports = router
