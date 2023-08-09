import express, { Express, Request, Response } from "express"
// const db = require("@/config/db/mongoDB")
import db from "@/config/db/mongoDB"
const movieServices = require("@/services/movie")
const pick = require("@/utils/pick")
const catchAsync = require("@/utils/catchAsync")

// In src/controllers/workoutController.js
export const getAll = catchAsync(async (req: Request, res: Response) => {
  //pagination receive two params: items_per_page
  const filter = pick(req.query, ["items_per_page", "page_number"])
  const allMovies = await movieServices.getAll(filter)
  res.send({ status: "ok", data: allMovies })
})

export const getOne = catchAsync(async (req: Request, res: Response) => {
  const movie = await movieServices.getOne(req.params.id)
  console.log(movie)
  res.send(movie)
})

export const createOne = async (req: Request, res: Response) => {
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
