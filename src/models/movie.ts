import db from "@/config/db/mongoDB"
import { ObjectId } from "mongodb"
import TABLES from "@/config/db/tables"

export const getAll = async (search: string, role: string, status: string, sortBy: string, perPage: number, pageNo: number) => {
  const movies = await db
    .collection(TABLES.MOVIES)
    .find({ Title: { $regex: search, $options: "i" } })
    .skip(perPage * pageNo)
    .limit(+perPage)
    .sort({ Title: 1, Director: 1 })
    // .project({ Title: 1 }) // returned field control
    .toArray()
  return { totalPages: Math.ceil(movies.length / perPage), pageNo: pageNo, perPage: perPage, movies }
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
