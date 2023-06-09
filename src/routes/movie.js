const express = require("express")
const router = express.Router()
const path = require("path")
const movieController = require("@/controllers/movie")
const verify = require("@/middlewares/authVerify")
const db = require("@/config/db/mongoDB")
const { ObjectID, ObjectId } = require("bson")

//get all movies
router.get("/", async function (req, res) {
  //
})

//get one movie
router.get("/:id", verify, async function (req, res) {
  const movie = await db.collection("movies").findOne({ _id: ObjectId(req.body.id) })
  res.send(movie)
})

//careate one movie
router.post("/", verify, async function (req, res) {
  //
})

//upodate one movie
router.put("/:id", verify, async (req, res) => {
  const movie = await db.collection("movies").findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: { ...req.body } })
  res.send(movie)
})

router.delete("/:id", verify, async function (req, res) {
  const movie = await db.collection("movies").findOneAndDelete({ _id: ObjectId(req.params.id) })
  res.send({ message: "You have successfully deleted this item." })
})

module.exports = router
