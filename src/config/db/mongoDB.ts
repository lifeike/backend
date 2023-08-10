// const { MongoClient } = require("mongodb")
const config = require("@/config/config")
import { MongoClient } from "mongodb"
console.log(config.parsed)
const client = new MongoClient(config.MONGODB_URL)
client.connect()
console.log("database running.")
const db = client.db("template")
export default db
