import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { authRepository } from "../repository/authRepository";
import { userRepository } from "../repository/userRepository";
import { generateToken, generateRefreshToken } from "../../../utils/generateToken";

import { MESSAGES } from "../../../message/messages";
import { IAuthDocument, IAuthInput } from "../types/IAuth";
import { IUser } from "../types/userTypes";

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

// -------------------- REGISTER --------------------
export const registerService = async (
  payload: Partial<IUser> & { email: string; password: string; role?: string }
): Promise<AuthResponse> => {
  try {
    const { name, email, password, role, phone, dateOfBirth, genderId } = payload;

    if (!name || !email || !password) {
      return { success: false, message: "Name, email, and password are required" };
    }

    // Check if email exists
    const existingAuth = await authRepository.findOneAuth({ email });
    if (existingAuth) return { success: false, message: "Email already exists" };

    // Determine role safely
    const authRole: "user" | "admin" = role === "admin" ? "admin" : "user";

    // Create Auth record
    const authPayload: IAuthInput = { email, password, role: authRole };
    const auth: IAuthDocument = await authRepository.createAuth(authPayload);

    // Create UserProfile linked to Auth
    const userProfilePayload: IUser = {
      authId: auth._id as mongoose.Types.ObjectId,
      name,
      phone,
      dateOfBirth,
      genderId,
    };
    const userProfile = await userRepository.createUser(userProfilePayload);

    // Generate JWT tokens
    const authId = (auth._id as mongoose.Types.ObjectId).toString();
    const token = generateToken(authId, auth.role || "user");
    const refreshToken = generateRefreshToken(authId);

    return {
      success: true,
      message: "User registered successfully",
      data: { auth, userProfile, token, refreshToken },
    };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { success: false, message: error.message || "Registration failed" };
  }
};

// -------------------- LOGIN --------------------
export const loginService = async (
  payload: { email: string; password: string }
): Promise<AuthResponse> => {
  try {
    // Validate input
    if (!payload.email || !payload.password) {
      return { success: false, message: "Email and password are required" };
    }

    const auth: IAuthDocument | null = await authRepository.findOneAuth({ email: payload.email });
    if (!auth) return { success: false, message: "Invalid credentials" };

    // Add validation before comparing passwords
    if (!auth.password) {
      console.error('Auth record found but password is undefined for email:', payload.email);
      return { success: false, message: "Invalid user configuration" };
    }

    const isPasswordValid = await auth.comparePassword(payload.password);
    if (!isPasswordValid) return { success: false, message: "Invalid credentials" };

    const userProfile = await userRepository.findOneUser({
      authId: auth._id as mongoose.Types.ObjectId,
    });

    const authId = (auth._id as mongoose.Types.ObjectId).toString();
    const token = generateToken(authId, auth.role || "user");
    const refreshToken = generateRefreshToken(authId);

    return {
      success: true,
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      data: { auth, userProfile, token, refreshToken },
    };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, message: error.message || "Login failed" };
  }
};

// -------------------- REFRESH --------------------
export const refreshService = async (refreshToken: string): Promise<AuthResponse> => {
  try {
    if (!refreshToken) return { success: false, message: "Refresh token missing" };

    // Get refresh secret with proper validation
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!refreshSecret) {
      throw new Error("JWT refresh secret is not configured");
    }

    const decoded = jwt.verify(refreshToken, refreshSecret) as {
      id: string;
      role?: string;
    };

    const newToken = generateToken(decoded.id, decoded.role || "user");

    return { success: true, message: "Token created successfully", data: { token: newToken } };
  } catch (error: any) {
    console.error("Refresh token error:", error);
    return { success: false, message: error.message || "Invalid refresh token" };
  }
};