class ApiError extends Error {
  constructor(statusCode: string, message: string, isOperational: boolean = true, stack = "") {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    if (stack) this.stack = stack
    else Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ApiError
