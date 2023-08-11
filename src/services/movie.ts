import db from "@/config/db/mongoDB"
import * as movieModel from "@/models/movie"
import httpStatus from "http-status"
const ApiError = require("@/utils/ApiError")

// In src/controllers/workoutController.js
export const getAll = async (filter: any) => {
  const movies = await movieModel.getAll(filter)
  return movies
}

export const getOne = async (id: string) => {
  const movie = await movieModel.getOne(id)
  if (!movie) throw new ApiError(httpStatus.NOT_FOUND, "Movie not found")
  return movie
}

export const createOne = async (movie: any) => {
  const result = null
  return result
}

export const updateOne = async (req: any, res: any) => {
  const movie = await db.collection("movies").findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } })
  res.send(movie)
}

export const deleteOne = async (req: any, res: any) => {
  const movie = await db.collection("movies").findOneAndDelete({ _id: req.params.id })
  res.send({ message: "You have successfully deleted this item." })
}
