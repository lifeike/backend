const db = require("@/config/db/mongoDB")
const movieModel = require("@/models/movie")

// In src/controllers/workoutController.js
const getAllMovies = async (filter) => {
  const movies = await movieModel.getAllMovies(filter)
  return movies
}

const getOneMovie = async (req, res) => {
  const movie = await db.collection("movies").findOne({ _id: ObjectId(req.body.id) })
  res.send(movie)
}

const createMovie = async (req, res) => {
  res.send("Create a new movie")
}

const updateMovie = async (req, res) => {
  const movie = await db.collection("movies").findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: { ...req.body } })
  res.send(movie)
}

const deleteMovie = async (req, res) => {
  const movie = await db.collection("movies").findOneAndDelete({ _id: ObjectId(req.params.id) })
  res.send({ message: "You have successfully deleted this item." })
}

module.exports = {
  getAllMovies,
  getOneMovie,
  createMovie,
  updateMovie,
  deleteMovie,
}
