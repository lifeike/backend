const express = require("express")
const cors = require("cors")
var bodyParser = require("body-parser")
//add .env to process.env
const dotenv = require("dotenv")
dotenv.config()

const app = express()
// app.use(cors({ origin: "https://main.d3nhqx7mts8be0.amplifyapp.com/" })) //enable production url
app.use(cors()) //enable production url
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/", require("./api/index"))
app.use("/auth", require("./api/auth"))
app.use("/user", require("./api/user"))
app.use("/movie", require("./api/movie"))
app.use("/upload", require("./api/upload"))
app.use("/chat", require("./api/chat"))

//require("./websocket/realTimeChat") //start real time websocket server 8081
//require("./websocket/goGame") //start go game websocket server 8082
app.listen(8080, () => console.log("http server running on port 8080")) //http server 8080
