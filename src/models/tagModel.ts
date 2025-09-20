import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
  name: string;       
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const tagSchema = new Schema<ITag>(
  {
  
    name: {
      type: String,
      required: [true, "name is required"],
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
const Tag = mongoose.model<ITag>("Tag", tagSchema);
export default Tag;
