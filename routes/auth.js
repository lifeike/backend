const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const path = require("path")
const db = require("../db")

router.post("/signIn", async function (req, res) {
  let payload = {
    iss: "gusibi.mobi",
    expiresIn: "200",
    iat: new Date().getTime(),
    aud: "www.test.com",
    issuer: "feeco",
  }
  let token = jwt.sign(payload, "secret", { expiresIn: "200" })
  let refreshToken = jwt.sign({ ...payload, type: "refresh-token" }, "secret", { expiresIn: "8h" })
  res.send({ token, refreshToken, user: { name: "feeco", age: 30 } })
})

module.exports = router
