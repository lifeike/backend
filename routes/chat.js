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
  //use user id to create chat
  // {
  //   isGroupChat:false,
  //   users:[],
  //   _id:"",
  //   chatName:""
  //   }
  console.log(req.body)
})

module.exports = router
