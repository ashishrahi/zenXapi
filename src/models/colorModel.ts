import mongoose, { Schema, Document } from "mongoose";

export interface IColor extends Document {
  code: string;      
  name: string;       
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const colorSchema = new Schema<IColor>(
  {
    code: {
      type: String,
      required: [true, "color code is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, "color name is required"],
      trim: true,
    },
  
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

// Export the model
const Color = mongoose.model<IColor>("Color", colorSchema);
export default Color;
