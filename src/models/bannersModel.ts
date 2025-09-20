import mongoose, { Schema, Document } from "mongoose";

export interface IBanners extends Document {
  title: string;
  description: string;
  image: string;
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

    image: {
      type: String,
      required: [true, "image is required"],
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

// Export the model
const Banners = mongoose.model<IBanners>("Banners", bannersSchema);
export default Banners;
