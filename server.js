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

const wsServer = new ws.Server({ noServer: true })
wsServer.on("connection", (socket) => {
  socket.on("message", (message) => console.log(message))
})

const server = app.listen(8080, () => console.log("server running on port 8080"))

server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request)
  })
})
