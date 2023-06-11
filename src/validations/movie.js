const Joi = require("joi")

const getAllMovies = {
  query: Joi.object().keys({
    name: Joi.string().required(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
}
