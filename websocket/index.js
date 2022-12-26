let id = 0
let clients = {}

const websocket = async (webSocketServer) => {
  webSocketServer.on("connection", function (websocket, request) {
    console.log("started client websocket")
    let connectionId = request.headers["sec-websocket-key"]

    websocket.on("message", function (data) {
      console.log(data)
    })

    websocket.on("close", function () {
      console.log("stopping client websocket")
    })
  })
}

module.exports = websocket
