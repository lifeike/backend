const { WebSocketServer } = require("ws")
const { v4: uuidv4 } = require("uuid")
const rooms = {}

// const wss = new WebSocketServer({ server: expressSever })
const wss = new WebSocketServer({ port: 8082 })
const uuid = uuidv4() // create here a uuid for this connection

wss.on("connection", (socket) => {
  socket.on("message", async (data) => {
    socket.send(JSON.stringify("ok ok"))
  })

  socket.on("close", () => {
    // for each room, remove the closed socket
    Object.keys(rooms).forEach((room) => leave(room))
  })
})
