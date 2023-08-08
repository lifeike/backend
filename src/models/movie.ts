import db from "@/config/db/mongoDB"

const getAllMovies = async (filterParams: any) => {
  const total = await db.collection("movies").count()
  const currentPage = filterParams.page_number
  const movies = await db
    .collection("movies")
    .find({})
    .skip(filterParams.items_per_page * filterParams.page_number)
    .limit(+filterParams.items_per_page)
    .toArray()
  return { totalPages: total / filterParams.items_per_page, movies, currentPage }
}

module.exports = {
  getAllMovies,
}
