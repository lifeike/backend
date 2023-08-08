import db from "@/config/db/mongoDB"
const movieModel = require("@/models/movie")

// In src/controllers/workoutController.js
const getAllMovies = async (filter: any) => {
  const movies = await movieModel.getAllMovies(filter)
  return movies
}

const getOneMovie = async (req: any, res: any) => {
  const movie = await db.collection("movies").findOne({ _id: req.body.id })
  res.send(movie)
}

const createMovie = async (req: any, res: any) => {
  res.send("Create a new movie")
}

const updateMovie = async (req: any, res: any) => {
  const movie = await db.collection("movies").findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } })
  res.send(movie)
}

const deleteMovie = async (req: any, res: any) => {
  const movie = await db.collection("movies").findOneAndDelete({ _id: req.params.id })
  res.send({ message: "You have successfully deleted this item." })
}

module.exports = {
  getAllMovies,
  getOneMovie,
  createMovie,
  updateMovie,
  deleteMovie,
}
