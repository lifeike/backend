const { WebSocketServer } = require("ws")
const messageHandler = require("./messageHandler")

const realTimeChatWebsocket = async (expressSever) => {
  const wss = new WebSocketServer({ server: expressSever })

  wss.on("connection", (socket) => {
    socket.on("message", async (data) => {
      const { meta, room, message } = JSON.parse(data)
      messageHandler(meta, room, message, socket)
    })

    socket.on("close", () => {
      // for each room, remove the closed socket
      Object.keys(rooms).forEach((room) => leave(room))
    })
  })
}

module.exports = realTimeChatWebsocket
