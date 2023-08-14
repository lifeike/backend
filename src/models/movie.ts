import db from "@/config/db/mongoDB"
import { ObjectId } from "mongodb"
import TABLES from "@/config/db/tables"
import * as commonTypes from "@/types/common"

export const getAll = async (params: commonTypes.SearchParams) => {
  const movies = await db
    .collection(TABLES.MOVIES)
    .find({ Title: { $regex: params.search, $options: "i" } })
    .skip((params.pageNo as number) * (params.perPage as number))
    .limit(params.perPage as number)
    .sort({ Title: 1, Director: 1 })
    // .project({ Title: 1 }) // returned field control
    .toArray()
  return { totalPages: Math.ceil(movies.length / (params.perPage as number)), pageNo: params.pageNo, perPage: params.perPage, movies }
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
