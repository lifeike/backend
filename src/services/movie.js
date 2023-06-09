const db = require("@/config/db/mongoDB")

// In src/controllers/workoutController.js
const getAllMovies = async (filterParams) => {
  //pagination receive two params: items_per_page
  const total = await db.collection("movies").count()
  if (filterParams.items_per_page && filterParams.page_number) {
    const movies = await db
      .collection("movies")
      .find({})
      .skip(filterParams.items_per_page * filterParams.page_number)
      .limit(+filterParams.items_per_page)
      .toArray()
    return { totalPages: total / filterParams.items_per_page, movies }
  } else {
    //or  if items_per_page is empty, return all items
    const movies = await db.collection("movies").find({}).toArray()
    return { totalPages: null, movies }
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
