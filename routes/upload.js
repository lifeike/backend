const express = require("express")
const router = express.Router()
const path = require("path")
const verify = require("../middlewares/authVerify")
const db = require("../db")
const { v4: uuidv4 } = require("uuid")
const multer = require("multer")
const { S3Client } = require("@aws-sdk/client-s3")
const multerS3 = require("multer-s3")

//1. in backend source code folder ./uploadImages/
const uploadLocally = multer({ dest: "./uploadImages/" })
router.post("/store-image-locally", uploadLocally.array("uploaded-images"), async (req, res) => {
  console.log(req.files)
  console.log(req.body)
  res.send("ok")
})

//2. uploaded files location is url,  store url mongo atlas
let s3 = new S3Client({
  region: "ca-central-1",
  credentials: {
    accessKeyId: "AKIARBXBS625SO2IKA57",
    secretAccessKey: "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",
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
})
const uploadToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "feeco-backend-bucket",
    contentType: multerS3.AUTO_CONTENT_TYPE, //important !!
    metadata: function (req, file, cb) {
      console.log(file.size)
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      console.log(file.size)
      cb(null, Date.now().toString())
    },
  }),
})

router.post("/store-image-aws-s3", uploadToS3.array("uploaded-images"), async (req, res) => {
  console.log(req.files)
  try {
    if (req.files.length === 0) {
      res.status(500).send("empty list")
      return
    } else {
      const insertResult = await db.collection("images").insertMany([...req.files])
      res.send(insertResult)
    }
  } catch (error) {
    res.send(error.message)
  }
})

router.get("/get-all-uploaded-images", verify, async (req, res) => {
  const images = await db.collection("images").find({}).toArray()
  res.send(images)
})

module.exports = router
