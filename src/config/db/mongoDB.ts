// const { MongoClient } = require("mongodb")
import { MongoClient } from "mongodb"
const url = "mongodb+srv://feeco:Test%401234@cluster0.de2gw.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url)
client.connect()
console.log("database running.")

const db = client.db("template")

export default db
