import { IUser } from "../types/userTypes.ts"; // Adjust path to your User model

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null; // Add optional user property
    }
  }
}
