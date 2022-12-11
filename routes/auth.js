const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const path = require("path")
const db = require("../db")

router.post("/signIn", async function (req, res) {
  console.log(req.body)

  let payload = {
    iss: "gusibi.mobi",
    expiresIn: "200",
    iat: new Date().getTime(),
    aud: "www.test.com",
    issuer: "feeco",
  }
  let access_token = jwt.sign(payload, "secret", { expiresIn: "200" })
  let refresh_token = jwt.sign({ ...payload, type: "refresh-token" }, "secret", { expiresIn: "8h" })
  if (req.body.username == "feeco" && req.body.password == "li") {
    res.send({ access_token, refresh_token, user: { name: "feeco", age: 30 } })
  } else {
    res.status(401).send("invalid credentials.")
  }
})

module.exports = router
