import { Document, Types } from "mongoose";

// Plain interface for creating auth
export interface IAuthInput {
  email: string;
  password: string;
  role?: "user" | "admin";
}

// Mongoose document interface
export interface IAuthDocument extends IAuthInput, Document {
  comparePassword(password: string): Promise<boolean>;
}

// Main auth interface
export interface IAuth {
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}
