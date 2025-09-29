import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";

export interface IRefreshToken {
  tokenHash: string;          // Hashed refresh token
  expiresAt: Date;            // Expiry date
}

export interface IAuth extends Document {
  email: string;
  password: string;
  role: "user" | "admin";
  refreshTokens: IRefreshToken[];
  comparePassword(password: string): Promise<boolean>;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { _id: false }
);

const authSchema = new Schema<IAuth>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    refreshTokens: { type: [RefreshTokenSchema], default: [] },
  },
  { timestamps: true }
);

// Hash password before saving
authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
authSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IAuth>("Auth", authSchema);
