import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  authId: Types.ObjectId;
  name: string;
  phone?: string;
  dateOfBirth?: Date;
  genderId?: Types.ObjectId;
  isActive: boolean;
}

const userSchema = new Schema<IUser>(
  {
    authId: { type: Schema.Types.ObjectId, ref: "Auth", required: true },
    name: { type: String, required: true },
    phone: { type: String },
    dateOfBirth: { type: Date },
    genderId: { type: Schema.Types.ObjectId, ref: "Gender" },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Register the model as "User"
export default mongoose.model<IUser>("User", userSchema);
