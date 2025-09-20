import mongoose, { Schema, Document } from "mongoose";

export interface IFAQ extends Document {
  question: string;  
  answer: string;       
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const faqSchema = new Schema<IFAQ>(
  {
  question: {
      type: String,
      required: [true, "question is required"],
      trim: true,
    },

    answer: {
      type: String,
      required: [true, "answer is required"],
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
const FAQ = mongoose.model<IFAQ>("FAQ", faqSchema);
export default FAQ;
