import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Auth from "../models/authModel"; // Auth model
import User from "../models/userModel"; // User model - agar alag file hai toh correct path dein

interface JwtPayload {
  id: string;  // Yeh authId hai (Auth collection ka _id)
  role: string;
}

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader?.startsWith("Bearer"))
      return res.status(401).json({ success: false, message: "Token missing" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecret") as JwtPayload;


    // ✅ Auth model mein search karein (credentials ke liye)

    const authUser = await Auth.findById(decoded.id).select("-password");
    if (!authUser) {
      console.log('❌ Auth user not found for ID:', decoded.id);
      return res.status(401).json({ success: false, message: "User not found" });
    }


    // ✅ Corresponding User document find karein authId se
    const userProfile = await User.findOne({ authId: decoded.id });
    
    // req.user mein dono information attach karein
    req.user = {
      _id: authUser._id,
      email: authUser.email,
      role: authUser.role,
      profile: userProfile ? {
        userId: userProfile._id,
        name: userProfile.name
      } : null
    };

    next();
  } catch (err: any) {
    console.error("Protect middleware error:", err.message);
    res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden: Access denied" });
    }
    next();
  };
};