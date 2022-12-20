const express = require("express")
const router = express.Router()
const path = require("path")
const db = require("../db")

router.get("/", async function (req, res) {
  //get all
  let result = await db.collection("chats").find({}).toArray()
  res.send(result)
})

router.post("/createChat", async function (req, res) {
  //todo: createdAt,updatedAt,latestMessage
  //find duplicated chat, if yes, dont create new chat
  let existingChat = await db.collection("chats").findOne({ users: [...req.body.users] })
  console.log(existingChat)
  //use user id to create chat
  if (!existingChat) {
    let result = await db.collection("chats").insertOne(req.body)
    res.send(result)
  } else {
    res.status(444).send("already exist")
  }
})

router.get("/getChatById/:id", async function (req, res) {
  //
})

module.exports = router
