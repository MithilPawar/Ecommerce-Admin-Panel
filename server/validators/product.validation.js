import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().allow(""),
  stock: Joi.number().min(0),
});
