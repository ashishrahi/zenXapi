import { Schema, model, Document } from "mongoose";

// Step 1: Create an interface extending Document
export interface IContactInfo extends Document {
  title: string;
  address?: string;
  cin?: string;
  email?: string;
  phone?: string;
  timing?: string;
  colspan?: number;
  isActive: boolean;
}

// Step 2: Define the schema
const contactInfoSchema = new Schema<IContactInfo>(
  {
    title: { type: String, required: true },
    address: { type: String },
    cin: { type: String },
    email: { type: String },
    phone: { type: String },
    timing: { type: String },
    colspan: { type: Number },
     isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // optional: adds createdAt and updatedAt
  }
);

// Step 3: Create the model
export const ContactInfoModel = model<IContactInfo>("ContactInfo", contactInfoSchema);


