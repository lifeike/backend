import { Router } from "express";

// Init router
const router = Router();

/**
 * Child Routes
 */
app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/user", require("./routes/user"))

/**
 * Default handler - mainly for testing
 */
router.get("/", (req, res) => {
  res.status(200).json({ message: "I am on the line!" });
});

router.post("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Posted successfully", data: req.body, version: 1 });
});

/**
 * Export base-router
 */
export default router;
