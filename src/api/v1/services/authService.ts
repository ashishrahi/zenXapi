import { MESSAGES } from "../../../message/messages";
import { generateToken, generateRefreshToken } from "../../../utils/generateToken";
import { userRepository } from "../repository";
import { IUser } from "../types/userTypes";
import jwt from "jsonwebtoken";

interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

// REGISTER
export const registerService = async (payload: Partial<IUser>): Promise<AuthResponse> => {
  try {
    const { name, email, password, role } = payload as any; // cast to any

    if (!name || !email || !password) {
      return { success: false, message: "Name, email, and password are required" };
    }

    const existingUser = await userRepository.findOneUser({ email }) as any;
    if (existingUser) return { success: false, message: "Email already exists" };

    const userPayload: IUser = { name, email, password, role: role || "user" };

    const user = await userRepository.createUser(userPayload) as any;

    const token = generateToken((user._id as any).toString(), user.role);
    const refreshToken = generateRefreshToken((user._id as any).toString());

    return { success: true, message: "User registered successfully", data: { user, token, refreshToken } };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { success: false, message: error.message || "Registration failed" };
  }
};

// LOGIN
export const loginService = async (payload: { email: string; password: string }): Promise<AuthResponse> => {
  try {
    const user = await userRepository.findOneUser({ email: payload.email }) as any;
    if (!user) return { success: false, message: "Invalid credentials" };

    const isPasswordValid = await user.comparePassword(payload.password);
    if (!isPasswordValid) return { success: false, message: "Invalid credentials" };

    const token = generateToken((user._id as any).toString(), user.role);
    const refreshToken = generateRefreshToken((user._id as any).toString());

    return { success: true, message: MESSAGES.AUTH.LOGIN_SUCCESS, data: { user, token, refreshToken } };
  } catch (error: any) {
    return { success: false, message: error.message || "Login failed" };
  }
};

// REFRESH
export const refreshService = async (refreshToken: string): Promise<AuthResponse> => {
  try {
    if (!refreshToken) return { success: false, message: "Refresh token missing" };

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "refreshsecret") as any;
    const newToken = generateToken(decoded.id, decoded.role || "user");

    return { success: true, message: "Token created successfully", data: { token: newToken } };
  } catch (error: any) {
    return { success: false, message: error.message || "Invalid refresh token" };
  }
};
