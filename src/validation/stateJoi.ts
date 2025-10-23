import Joi from "joi";

export const createStateSchema = Joi.object({
    name:Joi.string().min(2).max(50).required(),
    code:Joi.string().optional(),
    countryId:Joi.string().required(),
    isActive: Joi.boolean().optional()
})