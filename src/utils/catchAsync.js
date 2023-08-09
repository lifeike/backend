const catchAsync = (fn) => (req, res) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err))
}

module.exports = catchAsync
