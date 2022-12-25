const { db, collection } = require("./db")
const express = require("express")
const cors = require("cors")
var bodyParser = require("body-parser")
const { createServer } = require("http")
const { WebSocketServer } = require("ws")

const app = express()
//app.use(cors())
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

const server = createServer(app)
const wss = new WebSocketServer({ server })
wss.on("connection", function (ws) {
  console.log("started client websocket")

  ws.on("message", function message(data) {
    console.log("received: %s", data)
    ws.send("send all clients")
  })

  ws.on("close", function () {
    console.log("stopping client websocket")
  })
})

server.listen(8080, () => console.log("server running on port 8080"))
