import express, { Request, Response } from "express"
const router = express.Router()
import movie from "./movie"

router.get("/", (req: Request, res: Response) => res.send("Feeco's server is running."))
router.use("/movies", movie)
// router.use("/auth", require("./auth"))
// router.use("/chat", require("./chat"))
// router.use("/user", require("./user"))
// router.use("/upload", require("./upload"))

export default router
