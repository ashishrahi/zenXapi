import jwt from "jsonwebtoken";

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET || "supersecret", { expiresIn: "1d" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET || "refreshsecret", { expiresIn: "7d" });
};
