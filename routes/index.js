const express = require("express")
const router = express.Router()
const path = require("path")

router.use("/movie", require("./movie"))
router.use("/auth", require("./auth"))
router.use("/chat", require("./chat"))
router.use("/user", require("./user"))
router.use("/upload", require("./upload"))

module.exports = router
