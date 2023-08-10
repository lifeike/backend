// const { MongoClient } = require("mongodb")
const config = require("@/config/config")
import { MongoClient } from "mongodb"

const client = new MongoClient(config.mongo.url)
client.connect()
console.log("database running.")
const db = client.db("template")
export default db
