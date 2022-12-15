const express = require("express")
const router = express.Router()
const path = require("path")
const verify = require("../middlewares/authVerify")
const db = require("../db")
const { v4: uuidv4 } = require("uuid")
const multer = require("multer")

router.post("/store-image-locally", multer({ dest: "./uploadImages/" }).array("uploaded-images"), async (req, res) => {
  // const { image } = req.body
  // const url = await uploadToS3(image, uuidv4())
  // return res.json({ url })
  console.log(req.files)
  console.log(req.body)
  res.send("ok")
})

router.post("/store-image-aws-s3", multer({ dest: "./uploadImages/" }).array("uploaded-images"), async (req, res) => {
  // const { image } = req.body
  // const url = await uploadToS3(image, uuidv4())
  // return res.json({ url })
  console.log(req.files)
  console.log(req.body)
  res.send("ok")
})

module.exports = router
