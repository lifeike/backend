const db = require("@/config/db/mongoDB")

const getAllMovies = async (filterParams) => {
  const total = await db.collection("movies").count()
  console.log("hello")
  console.log(filterParams)
  console.log("world")
  const movies = await db
    .collection("movies")
    .find({})
    .skip(filterParams.items_per_page * filterParams.page_number)
    .limit(+filterParams.items_per_page)
    .toArray()
  return { totalPages: total / filterParams.items_per_page, movies }
}

module.exports = {
  getAllMovies,
}
