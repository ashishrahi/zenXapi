import { Document, Types } from "mongoose";

// Interface for refresh token
export interface IRefreshToken {
  tokenHash: string;
  expiresAt: Date;
}

// Plain interface for creating auth
export interface IAuthInput {
  email: string;
  password: string;
  role?: "user" | "admin";
  refreshTokens?: IRefreshToken[]; // optional when creating
}

// Mongoose document interface
export interface IAuthDocument extends IAuthInput, Document {
  refreshTokens: IRefreshToken[];   // now exists on the document
  comparePassword(password: string): Promise<boolean>;
}

// Main auth interface
export interface IAuth {
  email: string;
  password: string;
  role: "user" | "admin";
  refreshTokens?: IRefreshToken[];
  createdAt?: Date;
  updatedAt?: Date;
}
