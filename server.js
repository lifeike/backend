const { db, collection } = require("./db")
const express = require("express")
const cors = require("cors")
var bodyParser = require("body-parser")

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

app.get("/cancel", async function (req, res) {
  setTimeout(() => {
    const findResult = db.collection("documents").find({}).toArray()
    res.send(findResult)
  }, 2000)
})
const server = app.listen(8080, () => console.log("server running on port 8080"))
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
})

io.on("connection", (socket) => {
  console.log("connected to socket.io.")
  socket.on("setup", (userData) => {
    // console.log(userData._id)
    socket.join(userData._id)
    socket.emit("connected")
  })
  socket.on("join chat", (room) => {
    socket.join(room)
    console.log("user joined room id: ", room)
  })
})
