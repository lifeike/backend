import db from "@/config/db/mongoDB"
import { ObjectId } from "mongodb"
import * as movieModel from "@/models/movie"
import to from "await-to-js"

// In src/controllers/workoutController.js
export const getAll = async (filter: any) => {
  const movies = await movieModel.getAll(filter)
  return movies
}

export const getOne = async (id: string) => {
  const [error, movie] = await to(db.collection("movies").findOne({ _id: new ObjectId(id) }))
  console.log(movie)
  console.log(error)
  // if (movie) return movie
  // return error
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
