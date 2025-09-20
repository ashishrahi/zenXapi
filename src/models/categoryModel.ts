import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  gender?: Types.ObjectId; // optional
  images: string[];        // array of strings
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: [{ type: String, required: true }], 
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
