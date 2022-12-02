import { db, collection } from "./db"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import fs from "fs"

import BaseRouter from "./routes"

/**
 * Init Express
 */
const app = express()

/**
 * Add middleware/settings/routes to express.
 */
app.use(cors()) // for testing only - make more specific for production app
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", BaseRouter) // API Endpoint

/**
 * Default root response
 */
app.use("/", (req, res) => {
  res.sendStatus(200)
})

/**
 * Export Express instance
 */
export default app
