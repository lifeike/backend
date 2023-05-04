const express = require("express")
const router = express.Router()
const path = require("path")
const db = require("../db")

router.use(require("./movie"))

module.exports = router
