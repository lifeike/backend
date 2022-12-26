const websocket = async (wss) => {
  wss.on("connection", function (ws) {
    console.log("started client websocket")

    ws.on("message", function (data) {
      console.log("received: %s", data)
    })

    ws.on("close", function () {
      console.log("stopping client websocket")
    })
  })
}

module.exports = websocket
