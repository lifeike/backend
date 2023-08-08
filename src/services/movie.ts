import db from "@/config/db/mongoDB"
import * as movieModel from "@/models/movie"

// In src/controllers/workoutController.js
export const getAll = async (filter: any) => {
  const movies = await movieModel.getAll(filter)
  return movies
}

export const getOne = async (id: string) => {
  const movie = await db.collection("movies").findOne({ _id: id })
  return movie
}

export const createOne = async (req: any, res: any) => {
  res.send("Create a new movie")
}

export const updateOne = async (req: any, res: any) => {
  const movie = await db.collection("movies").findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } })
  res.send(movie)
}

export const deleteOne = async (req: any, res: any) => {
  const movie = await db.collection("movies").findOneAndDelete({ _id: req.params.id })
  res.send({ message: "You have successfully deleted this item." })
}
