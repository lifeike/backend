const express = require("express")
const router = express.Router()
const path = require("path")
const verify = require("../../middlewares/authVerify")
const db = require("../../db")
const { ObjectID, ObjectId } = require("bson")

router.get("/getMovies", async function (req, res) {
  //pagination receive two params: items_per_page
  res.send("v2 hello")
})

router.post("/findOneMovie", verify, async function (req, res) {
  const movie = await db.collection("movies").findOne({ _id: ObjectId(req.body.id) })
  res.send(movie)
})

router.post("/updateMovie/:id", verify, async (req, res) => {
  const movie = await db.collection("movies").findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: { ...req.body } })
  res.send(movie)
})

router.delete("/deleteMovie/:id", verify, async function (req, res) {
  const movie = await db.collection("movies").findOneAndDelete({ _id: ObjectId(req.params.id) })
  res.send({ message: "You have successfully deleted this item." })
})

module.exports = router
