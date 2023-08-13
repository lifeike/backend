import express, { Express, Request, Response } from "express"
// const db = require("@/config/db/mongoDB")
import db from "@/config/db/mongoDB"
const movieServices = require("@/services/movie")
const pick = require("@/utils/pick")
const catchAsync = require("@/utils/catchAsync")

// In src/controllers/workoutController.js
export const getAll = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name", "role"])
  const options = pick(req.query, ["sortBy", "perPage", "pageNo"])
  if (!options?.perPage) options.perPage = 10
  if (!options?.pageNo || options?.pageNo <= 0) options.pageNo = 0
  else options.pageNo = options?.pageNo - 1
  const movies = await movieServices.getAll(filter, options)
  movies.pageNo = movies.pageNo + 1
  res.status(200).send({ data: movies })
})

export const getOne = catchAsync(async (req: Request, res: Response) => {
  const movie = await movieServices.getOne(req.params.id)
  res.send(movie)
})

export const createOne = async (req: Request, res: Response) => {
  console.log(req)
  res.send("Create a new movie")
}

export const updateOne = async (req: Request, res: Response) => {
  const movie = await db.collection("movies").findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } })
  res.send(movie)
}

export const deleteOne = async (req: Request, res: Response) => {
  const movie = await db.collection("movies").findOneAndDelete({ _id: req.params.id })
  res.send({ message: "You have successfully deleted this item." })
}
