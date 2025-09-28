// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/userModel";

// interface JwtPayload {
//   id: string;
//   role: string;
// }

// export const protect = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader?.startsWith("Bearer"))
//       return res.status(401).json({ message: "Unauthorized" });

//     const token = authHeader.split(" ")[1];

//     console.log("Token extracted:", token); // debug

//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecret") as JwtPayload;

//     // Attach user to request
//     req.user = await User.findById(decoded.id).select("-password");

//     console.log("Logged-in user:", req.user); // debug

//     next();
//   } catch (err) {
//     console.error("Protect middleware error:", err);
//     res.status(401).json({ message: "Token invalid or expired" });
//   }
// };

// export const admin = (req: Request, res: Response, next: NextFunction) => {
//   if (req.user?.role !== "admin")
//     return res.status(403).json({ message: "Admin access required" });

//   next();
// };
