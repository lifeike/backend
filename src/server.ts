import "module-alias/register" //@ path alias
import express from "express"
import swaggerDocs from "@/config/swagger"
import cors from "cors"
import bodyParser from "body-parser"
import config from "@/config/config"
import { errorConverter, errorHandler } from "@/middlewares/error"

const app = express()
// app.use(cors({ origin: "https://main.d3nhqx7mts8be0.amplifyapp.com/" })) //enable production url
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//run swagger server
swaggerDocs(app, config.port)

app.use("/api/v1", require("@/routes/index"))
app.use(errorConverter)
app.use(errorHandler)
app.listen(config.port, () => console.log(`http server running on port ${config.port}`)) //http server 8080
