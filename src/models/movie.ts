import db from "@/config/db/mongoDB"
import { ObjectId } from "mongodb"
import TABLES from "@/config/db/tables"

export const getAll = async (filterParams: any) => {
  const total = await db.collection(TABLES.MOVIES).count()
  const currentPage = filterParams.page_number
  const movies = await db
    .collection(TABLES.MOVIES)
    .find({})
    .skip(filterParams.items_per_page * filterParams.page_number)
    .limit(+filterParams.items_per_page)
    .toArray()
  return { totalPages: total / filterParams.items_per_page, movies, currentPage }
}

export const createOne = async (movie: any) => {
  const result = await db.collection(TABLES.MOVIES).insertOne(movie)
  return result
}

export const getOne = async (id: string) => {
  const movie = await db.collection(TABLES.MOVIES).findOne({ _id: new ObjectId(id) })
  return movie
}
export const updateOne = async (id: string, body: any) => {
  const movie = await db.collection(TABLES.MOVIES).findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { body } })
  return movie
}
export const deleteOne = async (id: string) => {
  const movie = await db.collection(TABLES.MOVIES).findOneAndDelete({ _id: id })
  return movie
}
