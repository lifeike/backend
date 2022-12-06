const express = require("express")
const router = express.Router()
const path = require("path")
const verify = require("../middlewares/authVerify")
const db = require("../db")

router.get("/movies", verify, async function (req, res) {
  const findResult = await db.collection("users").find({}).toArray()
  // console.log("Found documents =>", findResult)
  res.send(findResult)
})

router.post("/addMovie", function (req, res) {
  db.collection("users").insertOne(req.body, function (err, result) {
    if (err) {
      res.status(400).send("Error inserting matches!")
    } else {
      res.send(result.insertedId)
    }
  })
})

router.put("/updateMovie", function (req, res) {
  db.collection("users").updateOne(
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
