let connectionList = []

const websocket = async (webSocketServer) => {
  webSocketServer.on("connection", function (websocket, request) {
    console.log("started client websocket")
    connectionList.push(ws)

    websocket.on("message", function (data) {
      console.log("received: %s", data)
      connectionList.forEach((item) => item.send("broadcast to all users"))
    })

    websocket.on("close", function () {
      console.log("stopping client websocket")
    })
  })
}

module.exports = websocket
