const db = require("@/config/db/mongoDB")
const movieServices = require("@/services/movie")

// In src/controllers/workoutController.js
const getAllMovies = async (req, res) => {
  //pagination receive two params: items_per_page
  const { pagination } = req.query
  try {
    const allMovies = await movieServices.getAllMovies({ pagination })
    res.send({ status: "ok", data: allMovies })
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } })
  }
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
