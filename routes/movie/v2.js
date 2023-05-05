const express = require("express")
const path = require("path")
const verify = require("../middlewares/authVerify")
const db = require("../db")
const { ObjectID, ObjectId } = require("bson")

const router = require("./")

router.get("/getMovies", verify, async function (req, res) {
  //pagination receive two params: items_per_page
  res.send("v2 router")
})

module.exports = router
