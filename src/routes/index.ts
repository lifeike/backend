import express, { Request, Response } from "express"
const router = express.Router()

router.get("/", (req: Request, res: Response) => res.send("Feeco's server is running."))
router.use("/movies", require("./movie.ts"))
// router.use("/auth", require("./auth"))
// router.use("/chat", require("./chat"))
// router.use("/user", require("./user"))
// router.use("/upload", require("./upload"))

export default router
