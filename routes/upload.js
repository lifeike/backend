const express = require("express")
const router = express.Router()
const path = require("path")
const verify = require("../middlewares/authVerify")
const db = require("../db")
// const uploadToS3 = require("../helpers/uploadToS3")
const { v4: uuidv4 } = require("uuid")
const multer = require("multer")

router.post("/image", multer({ dest: "~/test/" }).array("customFile"), async (req, res) => {
  // const { image } = req.body
  // const url = await uploadToS3(image, uuidv4())
  // return res.json({ url })
  console.log(req.files)
  console.log(req.body)
  res.send("ok")
})

module.exports = router
