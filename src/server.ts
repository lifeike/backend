import "module-alias/register" //@ path alias
import express from "express"
import swaggerDocs from "@/config/swagger"
import cors from "cors"
import bodyParser from "body-parser"
import config from "@/config/config"

const app = express()
// app.use(cors({ origin: "https://main.d3nhqx7mts8be0.amplifyapp.com/" })) //enable production url
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//run swagger server
swaggerDocs(app, 8080)

app.use("/api/v1", require("@/routes/index"))
app.listen(8080, () => console.log("http server running on port 8080")) //http server 8080
