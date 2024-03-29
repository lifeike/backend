// const mongoose = require('mongoose');
// const httpStatus = require('http-status');
// const logger = require('../config/logger');
import ApiError from "../utils/ApiError"
import httpStatus from "http-status"
import config from "@/config/config"
import { ErrorRequestHandler } from "express"

export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

// eslint-disable-next-line no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message } = err
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
  }

  res.locals.errorMessage = err.message

  const response = {
    status: statusCode || 500,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  }

  // if (config.env === "development") logger.error(err)

  res.status(statusCode || 500).send(response)
}
