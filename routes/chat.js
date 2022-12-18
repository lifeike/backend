const express = require("express")
const router = express.Router()
const path = require("path")
const db = require("../db")

router.get("/", async function (req, res) {
  //get all
  res.send("chat")
})

module.exports = router
