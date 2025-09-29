import mongoose, { Schema, Document } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: Date;
  isActive: boolean;
}

const EnquirySchema = new Schema<IEnquiry>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
   isActive: {
      type: Boolean,
      default: true,
    },
});

export const EnquireInfoModel = mongoose.model<IEnquiry>("EnquireInfoModel", EnquirySchema);
