const express = require("express")
const router = express.Router()
const path = require("path")
const verify = require("@/middlewares/authVerify")
const db = require("@/config/db/mongoDB")
const { ObjectID, ObjectId } = require("bson")

//get all movies
router.get("/", async function (req, res) {
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
