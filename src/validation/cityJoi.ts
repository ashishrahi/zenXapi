import Joi from "joi";

export const createCitySchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    code: Joi.string().optional(),
    stateId: Joi.string().hex().length(24).required(),
    isActive: Joi.boolean().optional()
})