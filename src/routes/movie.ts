import express from "express"
import * as movieController from "@/controllers/movie"
const movieValidation = require("@/validations/movie")
const validate = require("@/middlewares/validate")

const router = express.Router()
router.route("/").get(validate(movieValidation.getAll), movieController.getAll).post(movieController.createOne)
router.route("/:id").get(validate(movieValidation.getOne), movieController.getOne).put(movieController.updateOne).delete(movieController.deleteOne)
export default router

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
