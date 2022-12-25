const websocket = async (wss) => {
  wss.on("connection", function (ws) {
    console.log("started client websocket")

    ws.on("message", function message(data) {
      console.log("received: %s", data)
      ws.send("send all clients")
    })

    ws.on("close", function () {
      console.log("stopping client websocket")
    })
  })
}

module.exports = websocket
