const db = require("@/config/db/mongoDB")
const movieServices = require("@/services/movie")
const pick = require("@/utils/pick")
const catchAsync = require("@/utils/catchAsync")

// In src/controllers/workoutController.js
exports.getAllMovies = catchAsync(async (req, res) => {
  //pagination receive two params: items_per_page
  const filter = pick(req.query, ["items_per_page", "page_number"])
  const allMovies = await movieServices.getAllMovies(filter)
  res.send({ status: "ok", data: allMovies })
})

exports.getOneMovie = async (req, res) => {
  const movie = await db.collection("movies").findOne({ _id: ObjectId(req.body.id) })
  res.send(movie)
}

exports.createMovie = async (req, res) => {
  res.send("Create a new movie")
}

exports.updateMovie = async (req, res) => {
  const movie = await db.collection("movies").findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: { ...req.body } })
  res.send(movie)
}

exports.deleteMovie = async (req, res) => {
  const movie = await db.collection("movies").findOneAndDelete({ _id: ObjectId(req.params.id) })
  res.send({ message: "You have successfully deleted this item." })
}
