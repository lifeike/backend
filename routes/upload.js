const express = require("express")
const router = express.Router()
const path = require("path")
const verify = require("../middlewares/authVerify")
const db = require("../db")
const { v4: uuidv4 } = require("uuid")
const multer = require("multer")
const { S3Client } = require("@aws-sdk/client-s3")
const multerS3 = require("multer-s3")

const uploadLocally = multer({ dest: "./uploadImages/" })
router.post("/store-image-locally", uploadLocally.array("uploaded-images"), async (req, res) => {
  //in backend source code folder ./uploadImages/
  console.log(req.files)
  console.log(req.body)
  res.send("ok")
})

const s3 = new S3Client()
const uploadToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "some-bucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
})

router.post("/store-image-aws-s3", uploadToS3.array("uploaded-images"), async (req, res) => {
  console.log(res.files)
  console.log(res.files.location)
  res.send("ok")
})

module.exports = router
