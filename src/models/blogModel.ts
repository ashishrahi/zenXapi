import mongoose, { Document, Schema } from "mongoose";
import { IBlog } from "../api/v1/types/IBlogTypes";

export interface BlogDocument extends IBlog, Document {}

const BlogSchema = new Schema<BlogDocument>(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Blog = mongoose.model<BlogDocument>("Blog", BlogSchema);
