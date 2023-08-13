const Joi = require("joi")
const { password, objectId } = require("./custom.validation")

export const getAll = {
  query: Joi.object().keys({
    search: Joi.string().allow(""),
    pageNo: Joi.number(),
    perPage: Joi.number(),
  }),
}
export const getOne = {
  params: Joi.object().keys({
    // userId: Joi.string().custom(objectId),
    id: Joi.string(),
  }),
}
