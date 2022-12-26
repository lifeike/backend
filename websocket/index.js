const { v4: uuidv4 } = require("uuid")

const rooms = {}

const websocket = async (wss) => {
  wss.on("connection", (socket) => {
    const uuid = uuidv4() // create here a uuid for this connection

    socket.on("message", (data) => {
      const { message, meta, room } = data
      if (meta === "join") {
        if (!rooms[room]) rooms[room] = {} // create the room
        if (!rooms[room][uuid]) rooms[room][uuid] = socket // join the room
      } else if (meta === "leave") {
        leave(room)
      } else if (!meta) {
        // send the message to all in the room
        Object.entries(rooms[room]).forEach(([, sock]) => sock.send({ message }))
      }
    })

    socket.on("close", () => {
      // for each room, remove the closed socket
      Object.keys(rooms).forEach((room) => leave(room))
    })
  })
}

const leave = (room) => {
  // not present: do nothing
  if (!rooms[room][uuid]) return

  // if the one exiting is the last one, destroy the room
  if (Object.keys(rooms[room]).length === 1) delete rooms[room]
  // otherwise simply leave the room
  else delete rooms[room][uuid]
}

module.exports = websocket
