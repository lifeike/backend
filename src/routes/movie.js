const express = require("express")
const router = express.Router()
const path = require("path")
const movieController = require("@/controllers/movie")
const verify = require("@/middlewares/authVerify")
const db = require("@/config/db/mongoDB")
const { ObjectID, ObjectId } = require("bson")

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
router.get("/", movieController.getAllMovies)
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
router.get("/:id", verify, movieController.getOneMovie)
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
router.post("/", verify, movieController.createMovie)
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
router.put("/:id", verify, movieController.updateMovie)
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
router.delete("/:id", verify, movieController.deleteMovie)

module.exports = router
