const express = require("express")
const router = express.Router()
const path = require("path")
const verify = require("../middlewares/authVerify")
const db = require("../db")

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

router.post("/addMovie", function (req, res) {
  db.collection("movies").insertOne(req.body, function (err, result) {
    if (err) {
      res.status(400).send("Error inserting matches!")
    } else {
      res.send(result.insertedId)
    }
  })
})

router.put("/updateMovie", function (req, res) {
  db.collection("movies").updateOne(
    { first_name: req.body.first_name },
    {
      $set: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        ip_address: req.body.ip_address,
      },
    },
    function (req, result) {
      res.send("updated")
    }
  )
})

router.delete("/deleteMovie", function (req, res) {
  db.collection("users").deleteMany({ name: req.body.name }, function (req, result) {
    res.send("deleted.")
  })
})

module.exports = router
