import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Joi, { Schema } from "joi";

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Validation Error",
        details: error.details.map((d) => d.message),
      });
    }

    next();
  };
};
