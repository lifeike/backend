const express = require("express")
const cors = require("cors")
var bodyParser = require("body-parser")
const { createServer } = require("http")

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

require("./websocket/realTimeChat") //start real time websocket server 8081
require("./websocket/goGame") //start go game websocket server 8082
app.listen(8080, () => console.log("server running on port 8080")) //http server 8080
