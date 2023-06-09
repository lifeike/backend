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
router.get("/:id", verify, async function (req, res) {
  //
})

//careate one movie
router.post("/", verify, async function (req, res) {
  //
})

//upodate one movie
router.put("/:id", verify, async (req, res) => {
  //
})

router.delete("/:id", verify, async function (req, res) {
  //
})

module.exports = router
