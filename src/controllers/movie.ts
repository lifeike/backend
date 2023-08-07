import express, { Express, Request, Response } from "express"
const db = require("@/config/db/mongoDB")
const movieServices = require("@/services/movie")
const pick = require("@/utils/pick")
const catchAsync = require("@/utils/catchAsync")

// In src/controllers/workoutController.js
exports.getAllMovies = catchAsync(async (req: Request, res: Response) => {
  //pagination receive two params: items_per_page
  const filter = pick(req.query, ["items_per_page", "page_number"])
  const allMovies = await movieServices.getAllMovies(filter)
  res.send({ status: "ok", data: allMovies })
})

exports.getOneMovie = async (req: Request, res: Response) => {
  const movie = await db.collection("movies").findOne({ _id: req.body.id })
  res.send(movie)
}

exports.createMovie = async (req: Request, res: Response) => {
  res.send("Create a new movie")
}

exports.updateMovie = async (req: Request, res: Response) => {
  const movie = await db.collection("movies").findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } })
  res.send(movie)
}

exports.deleteMovie = async (req: Request, res: Response) => {
  const movie = await db.collection("movies").findOneAndDelete({ _id: req.params.id })
  res.send({ message: "You have successfully deleted this item." })
}
