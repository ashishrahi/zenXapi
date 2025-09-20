import mongoose, { Schema, Document } from "mongoose";

export interface IExport extends Document {
  country: string;  
  code: string;  
  flag : string;    
  volume : string; 
  category: string; 
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const exportSchema = new Schema<IExport>(
  {
  country: {
      type: String,
      required: [true, "country is required"],
      trim: true,
    },

    code: {
      type: String,
      required: [true, "code is required"],
      trim: true,
    },

      flag: {
      type: String,
      required: [true, "flag is required"],
      trim: true,
    },
  
   volume: {
      type: String,
      required: [true, "volume is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "category is required"],
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
const Export = mongoose.model<IExport>("Export", exportSchema);
export default Export;
