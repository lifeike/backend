import db from "@/config/db/mongoDB"
import * as movieModel from "@/models/movie"
import httpStatus from "http-status"
import ApiError from "@/utils/ApiError"
import * as commonTypes from "@/types/common"

export const createOne = async (movie: any) => {
  const result = await movieModel.createOne(movie)
  return result
}

export const getAll = async (params: commonTypes.SearchParams) => {
  const movies = await movieModel.getAll(params)
  return movies
}

export const getOne = async (id: string) => {
  const movie = await movieModel.getOne(id)
  if (!movie) throw new ApiError(httpStatus.NOT_FOUND, "Movie not found")
  return movie
}

export const updateOne = async (id: string, body: any) => {
  const movie = await movieModel.getOne(id)
  if (!movie) throw new ApiError(httpStatus.NOT_FOUND, "Movie not found")
  const result = await movieModel.updateOne(id, body)
  return result
}

export const deleteOne = async (id: string) => {
  const movie = await movieModel.deleteOne(id)
  if (!movie) throw new ApiError(httpStatus.NOT_FOUND, "Movie updates failed")
  return movie
}
