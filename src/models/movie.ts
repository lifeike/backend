import db from "@/config/db/mongoDB"
import { ObjectId } from "mongodb"
import TABLES from "@/config/db/tables"

export const getAll = async (filter: any, options: any) => {
  const total = await db.collection(TABLES.MOVIES).count()
  const movies = await db
    .collection(TABLES.MOVIES)
    .find({})
    .skip(options.perPage * options.pageNo)
    .limit(+options.perPage)
    .toArray()
  return { totalPages: total / options.perPage, movies, pageNo: options.pageNo, perPage: options.perPage }
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
