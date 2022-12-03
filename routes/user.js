const express = require("express")
const router = express.Router()
const path = require("path")
const verify = require("../routes/authVerify")
const { db, collection } = require("../db")

router.get("/getUser", verify, async function (req, res) {
  const findResult = await db.collection("documents").find({}).toArray()
  // console.log("Found documents =>", findResult)
  res.send(findResult)
})

router.post("/addUser", function (req, res) {
  collection.insertOne(req.body, function (err, result) {
    if (err) {
      res.status(400).send("Error inserting matches!")
    } else {
      res.send(result.insertedId)
    }
  })
})

router.put("/updateUser", function (req, res) {
  console.log(req.body)
  collection.updateOne(
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
  collection.deleteMany({ name: req.body.name }, function (req, result) {
    res.send("deleted.")
  })
})

module.exports = router
