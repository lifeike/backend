const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const path = require("path")
const db = require("../db")
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses")

router.post("/signIn", async function (req, res) {
  let access_token_payload = {
    iss: "feeco",
    exp: Math.floor(Date.now() / 1000) + 60,
    iat: Math.floor(Date.now() / 1000),
    aud: "www.test.com",
    type: "access-token",
  }
  let refresh_token_payload = {
    iss: "feeco",
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12,
    iat: Math.floor(Date.now() / 1000),
    aud: "www.test.com",
    type: "refresh-token",
  }
  let access_token = jwt.sign(access_token_payload, "secret")
  let refresh_token = jwt.sign(refresh_token_payload, "secret")
  if (req.body.username == "feeco" && req.body.password == "li") {
    res.send({ access_token, refresh_token, user: { name: "feeco", age: 30 } })
  } else {
    res.status(401).send("invalid credentials.")
  }
})

router.post("/refresh-token", async function (req, res) {
  let refresh_token = req.body.refresh_token
  let access_token_payload = {
    iss: "feeco",
    exp: Math.floor(Date.now() / 1000) + 30,
    iat: Math.floor(Date.now() / 1000),
    aud: "www.test.com",
    type: "access-token",
  }

  try {
    //verify refresh token first, if no error, continue
    const decoded = jwt.verify(refresh_token, "secret")
    let access_token = jwt.sign(access_token_payload, "secret")
    res.send({ access_token, refresh_token, user: { name: "feeco", age: 30 } })
    // throw new Error("hello world")
  } catch (error) {
    res.status(401).send("invalid refresh token.")
  }
})

router.post("/sign-up", async function (req, res) {
  //find duplicate email and return error or continue to send email for verification
  // console.log(req.body)
  let result = await db.collection("users").findOne({ email: req.body.email })
  if (result) {
    res.status(428).send("Email already exist")
  } else {
    res.send("Please check your email for verification code.")
  }

  const sesClient = new SESClient({ region: "ca-central-1" })
  var params = {
    Destination: {
      CcAddresses: ["524931087@qq.com"],
      ToAddresses: ["lifeike67@gmail.com"],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "HTML_FORMAT_BODY",
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Test email",
      },
    },
    Source: "524931087@qq.com" /* required */,
    ReplyToAddresses: [""],
  }

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail(params).promise()
  // Handle promise's fulfilled/rejected states
  await sendPromise
    .then(function (data) {
      console.log(data.MessageId)
    })
    .catch(function (err) {
      console.error(err, err.stack)
    })
})

router.post("/complete-sign-up-verification", async function (req, res) {
  //verify email and complete sign up
})

module.exports = router
