const express = require("express")
const cors = require("cors")
var bodyParser = require("body-parser")
const { createServer } = require("http")
require("./websocket/realTimeChat")() //my web socket functions
require("./websocket/goGame")() //my web socket functions

const app = express()
app.use(cors({ origin: "https://main.d2opyrywnuqr8v.amplifyapp.com/" }))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/user", require("./routes/user"))
app.use("/movie", require("./routes/movie"))
app.use("/upload", require("./routes/upload"))
app.use("/chat", require("./routes/chat"))

app.listen(8080, () => console.log("server running on port 8080"))
