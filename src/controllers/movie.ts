import express, { Express, Request, Response } from "express"
// const db = require("@/config/db/mongoDB")
import db from "@/config/db/mongoDB"
import * as movieServices from "@/services/movie"
import catchAsync from "@/utils/catchAsync"
import * as commonTypes from "@/types/common"

export const createOne = catchAsync(async (req: Request, res: Response) => {
  console.log(req)
  res.send("Create a new movie")
})

// In src/controllers/workoutController.js
export const getAll = catchAsync(async (req: commonTypes.RequestParams, res: Response) => {
  let { search, role, status, sortBy, perPage, pageNo } = req.query
  pageNo = pageNo - 1 //db pagination starts with 0
  const result = await movieServices.getAll({ search, role, status, sortBy, perPage, pageNo })
  result.pageNo = result.pageNo + 1
  res.status(200).send({ data: result })
})

export const getOne = catchAsync(async (req: Request, res: Response) => {
  const movie = await movieServices.getOne(req.params.id)
  res.send(movie)
})

export const updateOne = async (req: Request, res: Response) => {
  const movie = await db.collection("movies").findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } })
  res.send(movie)
}

export const deleteOne = async (req: Request, res: Response) => {
  const movie = await db.collection("movies").findOneAndDelete({ _id: req.params.id })
  res.send({ message: "You have successfully deleted this item." })
}
