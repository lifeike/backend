const Joi = require("joi")
const { password, objectId } = require("./custom.validation")

export const getAll = {
  query: Joi.object().keys({
    search: Joi.string().allow("").default(""),
    sortBy: Joi.string().allow("").default(""),
    pageNo: Joi.number().default(1),
    perPage: Joi.number().default(10),
  }),
}
export const getOne = {
  params: Joi.object().keys({
    // userId: Joi.string().custom(objectId),
    id: Joi.string(),
  }),
}
