import Joi from "joi";
import { title } from "process";

// create banner
export const createBannersSchema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(1000).required(),
    images: Joi.array().items(Joi.string().uri()).min(1).required(),
    isActive: Joi.boolean().default(true)
})
//  update banner
export const updateBannersSchema = Joi.object({
    title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(5).max(1000).optional(),
  images: Joi.array().items(Joi.string().uri()).optional(),
  isActive: Joi.boolean().optional(),
})