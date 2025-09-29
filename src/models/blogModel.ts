import mongoose, { Document, Schema } from "mongoose";
import { IBlog } from "../api/v1/types/IBlogTypes";

export interface BlogDocument extends IBlog, Document {}

const BlogSchema = new Schema<BlogDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String, required: true }],
    tags: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model<BlogDocument>("Blog", BlogSchema);
