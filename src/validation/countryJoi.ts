import Joi from "joi";

// create
export const createCountrySchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    code: Joi.string().optional(),
    isActive: Joi.boolean().optional()
})
// update
export const updateCountrySchema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    code: Joi.string().optional(),
    isActive: Joi.boolean().optional()
})