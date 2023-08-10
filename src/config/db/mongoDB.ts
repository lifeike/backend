import { MongoClient } from "mongodb"
import config from "@/config/config"

const client = new MongoClient(config?.mongo?.url)
client.connect()
console.log("database running.")
const db = client.db("template")
export default db
