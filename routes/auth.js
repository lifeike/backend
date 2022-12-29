const jwt = require("jsonwebtoken")
const router = require("express").Router()
const db = require("../db")
const { sesClient, createSendEmailCommand } = require("../aws/ses")

router.post("/signIn", async function (req, res) {
  let access_token_payload = {
    iss: "feeco",
    exp: Math.floor(Date.now() / 1000) + 60,
    iat: Math.floor(Date.now() / 1000),
    aud: "www.test.com",
    type: "access-token",
    emai: req.body.email,
  }
  let refresh_token_payload = {
    iss: "feeco",
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    iat: Math.floor(Date.now() / 1000),
    aud: "www.test.com",
    type: "refresh-token",
    email: req.body.email,
  }
  let access_token = jwt.sign(access_token_payload, "secret")
  let refresh_token = jwt.sign(refresh_token_payload, "secret")
  let user = await db.collection("users").findOne({ email: req.body.email, password: req.body.password })
  if (user) {
    res.send({ access_token, refresh_token, user: user })
  } else {
    res.status(444).send("User not found.")
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
    let user = await db.collection("users").findOne({ email: decoded.email })
    let access_token = jwt.sign(access_token_payload, "secret")
    res.send({ access_token, refresh_token, user })
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
    //pending status user in the database
    let insertResult = await db.collection("users").insertOne({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      status: "waiting-for-verification-code",
    })
    res.send("Please check your email for verification code.")
  }

  //send verification to new register user
  const sendEmailCommand = createSendEmailCommand(req.body.email, "lifeike67@gmail.com")
  try {
    await sesClient.send(sendEmailCommand)
  } catch (e) {
    console.error("Failed to send email.")
    console.log(e)
    return e
  }
})

router.post("/complete-sign-up-verification", async function (req, res) {
  //verify email and complete sign up
  //change status of user to complete
})

module.exports = router
