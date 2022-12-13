const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const path = require("path")
const db = require("../db")

router.post("/signIn", async function (req, res) {
  let access_token_payload = {
    iss: "feeco",
    exp: Math.floor(Date.now() / 1000) + 60 * 2,
    iat: new Date().getTime(),
    aud: "www.test.com",
    type: "access-token",
  }
  let refresh_token_payload = {
    iss: "feeco",
    exp: Math.floor(Date.now() / 1000) + 60 * 2,
    iat: new Date().getTime(),
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
  console.log(req.body)
})
module.exports = router
