const Joi = require("joi")

export const getAllMovies = {
  query: Joi.object().keys({
    items_per_page: Joi.string().required(),
    page_number: Joi.string().required(),
  }),
}
export const getMovie = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
}
