let id = 0
let clients = {}

const websocket = async (webSocketServer) => {
  webSocketServer.on("connection", function (websocket, request) {
    console.log("started client websocket")
    websocket.id = id++
    clients[websocket.id] = websocket

    websocket.on("message", function (data) {
      console.log("received: %s", data)
    })

    websocket.on("close", function () {
      console.log("stopping client websocket")
    })
  })
}

module.exports = websocket
