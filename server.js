const express = require("express")
const cors = require("cors")
var bodyParser = require("body-parser")
//add .env to process.env
const dotenv = require("dotenv")
dotenv.config()

const app = express()
// app.use(cors({ origin: "https://main.d3nhqx7mts8be0.amplifyapp.com/" })) //enable production url
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/api/v1", require("./routes/v1/index"))
app.use("/api/v2", require("./routes/v2/index"))
app.listen(8080, () => console.log("http server running on port 8080")) //http server 8080
