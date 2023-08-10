const express = require("express")
const router = express.Router()
const path = require("path")
import * as movieController from "@/controllers/movie"
const verify = require("@/middlewares/authVerify")
const db = require("@/config/db/mongoDB")
const movieValidation = require("@/validations/movie")
const validate = require("@/middlewares/validate")
const { ObjectID, ObjectId } = require("bson")

router.get("/", validate(movieValidation.getAllMovies), movieController.getAll)
router.get("/:id", validate(movieValidation.getAllMovies), movieController.getOne)
router.post("/", movieController.createOne)
router.put("/:id", movieController.updateOne)
router.delete("/:id", movieController.deleteOne)

/**
 * @openapi
 * /api/v1/moives:
 *   get:
 *     tags:
 *       - Movies
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
/**
 * @openapi
 * /api/v1/moives/:id:
 *   get:
 *     tags:
 *       - Movies
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
/**
 * @openapi
 * /api/v1/moives:
 *   post:
 *     tags:
 *       - Movies
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
/**
 * @openapi
 * /api/v1/moives/:id:
 *   put:
 *     tags:
 *       - Movies
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
/**
 * @openapi
 * /api/v1/moives:
 *   delete:
 *     tags:
 *       - Movies
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
module.exports = router
