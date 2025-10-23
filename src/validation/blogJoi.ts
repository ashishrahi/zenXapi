import Joi from "joi";

// Define the Joi validation schema
export const createBlogSchema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(100)
    .required()
    .messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 5 characters",
      "string.max": "Title cannot exceed 100 characters",
    }),
  description: Joi.string()
    .min(10)
    .max(500)
    .required()
    .messages({
      "string.empty": "Description is required",
      "string.min": "Description must be at least 10 characters",
      "string.max": "Description cannot exceed 500 characters",
    }),
  category: Joi.string()
    .valid("Tech", "Lifestyle", "Education", "Entertainment") // example categories
    .required()
    .messages({
      "any.only": "Category must be one of Tech, Lifestyle, Education, Entertainment",
      "string.empty": "Category is required",
    }),
  content: Joi.string()
    .min(20)
    .required()
    .messages({
      "string.empty": "Content is required",
      "string.min": "Content must be at least 20 characters",
    }),
  images: Joi.array()
    .items(
      Joi.string()
        .uri()
        .pattern(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/)
        .required()
        .messages({
          "string.uri": "Image must be a valid URL",
          "string.pattern.base": "Image must be a valid image URL (jpg, png, etc.)",
        })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one image is required",
    }),
  tags: Joi.array()
    .items(Joi.string())
    .max(10)
    .messages({
      "array.max": "Cannot have more than 10 tags",
    }),
  isActive: Joi.boolean().optional(),
});
