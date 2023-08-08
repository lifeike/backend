const express = require("express")
const router = express.Router()
const path = require("path")

router.get("/", (req, res) => res.send("Feeco's server is running."))
router.use("/movies", require("./movie.ts"))
// router.use("/auth", require("./auth"))
// router.use("/chat", require("./chat"))
// router.use("/user", require("./user"))
// router.use("/upload", require("./upload"))

module.exports = router
