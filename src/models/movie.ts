import db from "@/config/db/mongoDB"
import { ObjectID, ObjectId } from "mongodb"
const collectionName = "movie"

export const getAll = async (filterParams: any) => {
  const total = await db.collection(collectionName).count()
  const currentPage = filterParams.page_number
  const movies = await db
    .collection(collectionName)
    .find({})
    .skip(filterParams.items_per_page * filterParams.page_number)
    .limit(+filterParams.items_per_page)
    .toArray()
  return { totalPages: total / filterParams.items_per_page, movies, currentPage }
}

export const getOne = async (id: string) => {
  const movie = await db.collection(collectionName).findOne({ _id: new ObjectId(id) })
  return movie
}
export const updateOne = async (id: string, body: any) => {
  const movie = await db.collection(collectionName).findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { body } })
  return movie
}
export const deleteOne = async (id: string) => {
  const movie = await db.collection(collectionName).findOneAndDelete({ _id: id })
  return movie
}
