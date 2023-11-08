import express from "express"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"
import compression from "compression"
import swaggerDocs from "@/config/swagger"
import cors from "cors"
import bodyParser from "body-parser"
import config from "@/config/config"
import ApiError from "@/utils/ApiError"
import httpStatus from "http-status"
import v1Router from "./routes/index"
import { errorConverter, errorHandler } from "@/middlewares/error"

const app = express()
// app.use(cors({ origin: "https://main.d3nhqx7mts8be0.amplifyapp.com/" })) //enable production url
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//run swagger server
// swaggerDocs(app, config.port)
// set security HTTP headers
app.use(helmet())
// sanitize request data
app.use(mongoSanitize())
// gzip compression
app.use(compression())

app.use("/api/v1", v1Router)
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"))
})

app.use(errorConverter)
app.use(errorHandler)
app.listen(config.port || "3000", () => console.log(`http server running on port ${config.port}`)) //http server 8080
