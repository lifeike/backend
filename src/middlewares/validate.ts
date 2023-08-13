import Joi from "joi"
import httpStatus from "http-status"
const pick = require("@/utils/pick")
import ApiError from "@/utils/ApiError"
import express, { Request, Response } from "express"

const validate = (schema: any) => (req: Request, res: Response, next: any) => {
  const validSchema = pick(schema, ["params", "query", "body"])
  const object = pick(req, Object.keys(validSchema))
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object)

  if (error) {
    const errorMessage = error.details.map((details: any) => details.message).join(", ")
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage))
  }
  Object.assign(req, value)
  return next()
}

module.exports = validate
