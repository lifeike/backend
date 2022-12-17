const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const path = require("path")
const db = require("../db")

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
  console.log(req.body)
  let result = db.collection("users").findOne({})
  if (result) {
    res.status(428).send("Email already exist")
  } else {
    res.send("Registered successfully.")
  }
})

router.post("/complete-sign-up-verification", async function (req, res) {
  //verify email and complete sign up
})

module.exports = router
