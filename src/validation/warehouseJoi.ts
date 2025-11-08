import Joi from "joi";
import mongoose from "mongoose";

export const createWarehouseSchema = Joi.object({
  supplierId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),

  name: Joi.string().min(2).max(50).required(),

  email: Joi.string().email().required(),

  phone: Joi.number().integer().min(1000000000).max(9999999999).required(),

  address: Joi.array()
    .items(
      Joi.object({
        house: Joi.string().required(),
        cityId: Joi.string()
          .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              return helpers.error("any.invalid");
            }
            return value;
          })
          .required(),
        stateId: Joi.string()
          .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              return helpers.error("any.invalid");
            }
            return value;
          })
          .required(),
        countryId: Joi.string()
          .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              return helpers.error("any.invalid");
            }
            return value;
          })
          .required(),
      })
    )
    .required(),

  isActive: Joi.boolean().default(true),
});
