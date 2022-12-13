const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const path = require("path")
const db = require("../db")

router.post("/signIn", async function (req, res) {
  console.log(req.body)

  let payload = {
    iss: "feeco",
    exp: Math.floor(Date.now() / 1000) + 60 * 1,
    iat: new Date().getTime(),
    aud: "www.test.com",
  }
  let access_token = jwt.sign(payload, "secret")
  let refresh_token = jwt.sign({ ...payload, type: "refresh-token" }, "secret")
  if (req.body.username == "feeco" && req.body.password == "li") {
    res.send({ access_token, refresh_token, user: { name: "feeco", age: 30 } })
  } else {
    res.status(401).send("invalid credentials.")
  }
})

module.exports = router
