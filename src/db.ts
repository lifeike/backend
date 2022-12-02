// const { MongoClient } = require("mongodb")
// or as an es module:
import { MongoClient } from "mongodb"

// Connection URL
const url = "mongodb+srv://feeco:Test%401234@cluster0.de2gw.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url)

// Database Name
const dbName = "myProject"

client.connect()
console.log("Connected successfully to server")
const db = client.db(dbName)
const collection = db.collection("documents")

// module.exports = { db, collection }
export { db, collection }
