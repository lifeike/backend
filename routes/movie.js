const express = require("express")
const router = express.Router()
const path = require("path")
const verify = require("../middlewares/authVerify")
const db = require("../db")
const { ObjectID, ObjectId } = require("bson")

router.get("/getMovies", verify, async function (req, res) {
  //pagination receive two params: items_per_page
  const total = await db.collection("movies").count()
  if (req.query.items_per_page && req.query.page_number) {
    const movieList = await db
      .collection("movies")
      .find({})
      .skip(req.query.items_per_page * req.query.page_number)
      .limit(+req.query.items_per_page)
      .toArray()
    res.send({ totalPages: total / req.query.items_per_page, movieList })
  } else {
    //or  if items_per_page is empty, return all items
    const movieList = await db.collection("movies").find({}).toArray()
    res.send({ totalPages: null, movieList })
  }
})

router.post("/findOneMovie", verify, async function (req, res) {
  const movie = await db.collection("movies").findOne({ _id: ObjectId(req.body.id) })
  res.send(movie)
})

router.post("/updateMovie/:id", verify, async (req, res) => {
  const movie = await db.collection("movies").findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: { ...req.body } })
  res.send(movie)
})

router.delete("/deleteMovie", function (req, res) {
  db.collection("users").deleteMany({ name: req.body.name }, function (req, result) {
    res.send("deleted.")
  })
})

module.exports = router
