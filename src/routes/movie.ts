const express = require("express")
const router = express.Router()
const path = require("path")
import * as movieController from "@/controllers/movie"
const verify = require("@/middlewares/authVerify")
const db = require("@/config/db/mongoDB")
const movieValidation = require("@/validations/movie")
const validate = require("@/middlewares/validate")
const { ObjectID, ObjectId } = require("bson")

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
router.get("/", validate(movieValidation.getAllMovies), movieController.getAll)
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
router.get("/:id", verify, movieController.getOne)
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
router.post("/", verify, movieController.createOne)
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
router.put("/:id", verify, movieController.updateOne)
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
router.delete("/:id", verify, movieController.deleteOne)

module.exports = router
