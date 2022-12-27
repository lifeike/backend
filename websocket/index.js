const { v4: uuidv4 } = require("uuid")

const rooms = {}

const websocket = async (wss) => {
  wss.on("connection", (socket) => {
    const uuid = uuidv4() // create here a uuid for this connection

    const leave = (room) => {
      // not present: do nothing
      if (rooms[room] == undefined) return
      // if the one exiting is the last one, destroy the room
      if (Object.keys(rooms[room]).length === 1) delete rooms[room]
      // otherwise simply leave the room
      else delete rooms[room][uuid]
    }

    socket.on("message", (data) => {
      const { meta, room, message } = JSON.parse(data)
      console.log(meta, room, message)

      if (meta === "join") {
        if (!rooms[room]) rooms[room] = {} // create the room
        if (!rooms[room][uuid]) rooms[room][uuid] = socket // join the room
        socket.send(JSON.stringify({ meta: "joined", room, message: `You have joined room ${room}` }))
      } else if (meta === "leave") {
        leave(room)
      } else if (meta === "message") {
        // send the message to all in the room
        for (const [key, sock] of Object.entries(rooms[room])) {
          sock.send(JSON.stringify({ meta, room, message }))
        }
      }
    })

    socket.on("close", () => {
      // for each room, remove the closed socket
      Object.keys(rooms).forEach((room) => leave(room))
    })
  })
}

module.exports = websocket
