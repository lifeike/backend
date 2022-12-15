const express = require("express")
const router = express.Router()
const path = require("path")
const verify = require("../middlewares/authVerify")
const db = require("../db")

router.post("/image", verify, async (req, res) => {
  const { image } = req.body
  const url = await uploadToS3(image, uuid())
  return res.json({ url })
})

module.exports = router
