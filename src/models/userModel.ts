import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUserProfile extends Document {
  authId: Types.ObjectId; // Reference to Auth collection
  name: string;
  phone?: string;
  dateOfBirth?: Date;
  genderId?: Types.ObjectId; // Reference to Gender collection
}

const userProfileSchema = new Schema<IUserProfile>(
  {
    authId: { type: Schema.Types.ObjectId, ref: "Auth", required: true },
    name: { type: String, required: true },
    phone: { type: String },
    dateOfBirth: { type: Date },
    genderId: { type: Schema.Types.ObjectId, ref: "Gender" },
  },
  { timestamps: true }
);

export default mongoose.model<IUserProfile>("UserProfile", userProfileSchema);
