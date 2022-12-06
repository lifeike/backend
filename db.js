const { MongoClient } = require("mongodb")
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb+srv://feeco:Test%401234@cluster0.de2gw.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url)
client.connect()
console.log("Connected successfully to server")

const db = client.db("template")
const collection = db.collection("users")

module.exports = { db, collection }
