const express = require("express")
const router = express.Router()
const path = require("path")

router.use("/movie", require("./movie"))

module.exports = router
