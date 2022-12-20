const express = require("express")
const router = express.Router()
const path = require("path")
const verify = require("../middlewares/authVerify")
const db = require("../db")

//fetch all users
router.get("/getUser", verify, async function (req, res) {
  const findResult = await db.collection("users").find({}).toArray()
  res.send(findResult)
})

//search user
router.get("/search", async function (req, res) {
  console.log(req.originalUrl)
  console.log(req.query.keyword)
  let result = await db
    .collection("users")
    .find({ first_name: { $regex: req.query.keyword, $options: "i" } })
    .toArray()
  res.send(result)
})

router.post("/addUser", function (req, res) {
  db.collection("users").insertOne(req.body, function (err, result) {
    if (err) {
      res.status(400).send("Error inserting matches!")
    } else {
      res.send(result.insertedId)
    }
  })
})

router.put("/updateUser", function (req, res) {
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

router.delete("/deleteUser", function (req, res) {
  db.collection("users").deleteMany({ name: req.body.name }, function (req, result) {
    res.send("deleted.")
  })
})

module.exports = router
