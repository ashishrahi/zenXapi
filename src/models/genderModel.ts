import mongoose, { Schema, Document } from "mongoose";
import { IGender } from "../api/v1/types/genderTypes";

export interface IGenderDocument extends IGender, Document {}

const genderSchema = new Schema<IGenderDocument>(
  {
    name: {
      type: String,
      required: [true, "Gender name is required"],
      trim: true,
      unique: true,
    },
   
    status: {
      type: Boolean,
      default: true, // Active by default
    },
  },
  { timestamps: true }
);

const Gender = mongoose.model<IGenderDocument>("Gender", genderSchema);

export default Gender;
