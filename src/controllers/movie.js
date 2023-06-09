// In src/controllers/workoutController.js
const getAllMovies = async (req, res) => {
  //pagination receive two params: items_per_page
  const total = await db.collection("movies").count()
  if (req.query.items_per_page && req.query.page_number) {
    const movieList = await db
      .collection("movies")
      .find({})
      .skip(req.query.items_per_page * req.query.page_number)
      .limit(+req.query.items_per_page)
      .toArray()
    res.send({ totalPages: total / req.query.items_per_page, movieList })
  } else {
    //or  if items_per_page is empty, return all items
    const movieList = await db.collection("movies").find({}).toArray()
    res.send({ totalPages: null, movieList })
  }
}

const getOneMovie = (req, res) => {
  res.send("Get an existing workout")
}

const createMovie = (req, res) => {
  res.send("Create a new workout")
}

const updateMovie = (req, res) => {
  res.send("Update an existing workout")
}

const deleteMovie = (req, res) => {
  res.send("Delete an existing workout")
}

module.exports = {
  getAllMovies,
  getOneMovie,
  createMovie,
  updateMovie,
  deleteMovie,
}
