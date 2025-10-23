import mongoose, { Schema, Document } from "mongoose";

export interface IBanners extends Document {
  title: string;
  description: string;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const bannersSchema = new Schema<IBanners>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },

    images: { 
      type: [String],
      required: [true, "images are required"],
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Banners = mongoose.model<IBanners>("Banners", bannersSchema);
export default Banners;
