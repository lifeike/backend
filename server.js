const { db, collection } = require("./db")
const express = require("express")
const cors = require("cors")
var bodyParser = require("body-parser")
const { createServer } = require("http")
const applyRealTimeChatWebsocket = require("./websocket") //my web socket functions

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

const server = createServer(app)
applyRealTimeChatWebsocket(server)

server.listen(8080, () => console.log("server running on port 8080"))
