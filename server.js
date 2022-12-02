//const { db, collection } = require("./db")
const express = require("express")
const cors = require("cors")
var bodyParser = require("body-parser")

const app = express()
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/user", require("./routes/user"))

app.get("/cancel", async function (req, res) {
  setTimeout(() => {
    const findResult = db.collection("documents").find({}).toArray()
    res.send(findResult)
  }, 2000)
})
app.listen(5000, () => console.log("server running"))
