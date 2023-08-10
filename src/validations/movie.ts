const Joi = require("joi")
const { password, objectId } = require("./custom.validation")

export const getAll = {
  query: Joi.object().keys({
    items_per_page: Joi.string().required(),
    page_number: Joi.string().required(),
  }),
}
export const getOne = {
  params: Joi.object().keys({
    // userId: Joi.string().custom(objectId),
    id: Joi.string(),
  }),
}
