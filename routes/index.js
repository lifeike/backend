const express = require("express")
const router = express.Router()
const path = require("path")
const { db, collection } = require("../db")

router.get("/", async function (req, res) {
  //const findResult = await db.collection("documents").find({}).toArray()
  // console.log("Found documents =>", findResult)
  res.send("ok")
})

module.exports = router
