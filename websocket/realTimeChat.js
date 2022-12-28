const { WebSocketServer } = require("ws")
const { v4: uuidv4 } = require("uuid")
const rooms = {}

  // const wss = new WebSocketServer({ server: expressSever })
  const wss = new WebSocketServer({ port: 8081 })
  const uuid = uuidv4() // create here a uuid for this connection

  wss.on("connection", (socket) => {
    socket.on("message", async (data) => {
      const { meta, room, message } = JSON.parse(data)
      if (meta === "join") {
        if (!rooms[room]) rooms[room] = {} // create the room
        if (!rooms[room][uuid]) rooms[room][uuid] = socket // join the room
        socket.send(JSON.stringify({ meta: "joined", room, message: `You have joined room ${room}` }))
      } else if (meta === "leave") {
        // not present: do nothing
        if (rooms[room] == undefined) return
        // if the one exiting is the last one, destroy the room
        if (Object.keys(rooms[room]).length === 1) delete rooms[room]
        // otherwise simply leave the room
        else delete rooms[room][uuid]
      } else if (meta === "message") {
        // send the message to all in the room
        for (const [key, sock] of Object.entries(rooms[room])) {
          sock.send(JSON.stringify({ meta, room, message }))
        }
      }
    })

    socket.on("close", () => {
      // for each room, remove the closed socket
      // Object.keys(rooms).forEach((room) => leave(room))
    })
  })

