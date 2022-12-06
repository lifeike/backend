const express = require("express")
const router = express.Router()
const path = require("path")
const db = require("../db")

router.get("/", async function (req, res) {
  const findResult = await db.collection("users").find({}).toArray()
  // console.log("Found documents =>", findResult)
  res.send(findResult)
})

module.exports = router
