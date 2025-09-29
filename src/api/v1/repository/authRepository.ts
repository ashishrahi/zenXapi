import Auth from "../../../models/authModel";
import { IAuthDocument, IAuthInput } from "../types/IAuth";

export const authRepository = {
  createAuth: async (payload: IAuthInput): Promise<IAuthDocument> => {
    const newAuth = new Auth(payload);
    return await newAuth.save();
  },

  findOneAuth: async (query: Partial<IAuthInput>): Promise<IAuthDocument | null> => {
    return await Auth.findOne(query);
  },

  findAuthById: async (id: string): Promise<IAuthDocument | null> => {
    return await Auth.findById(id);
  },

  updateAuth: async (id: string, payload: Partial<IAuthInput>): Promise<IAuthDocument | null> => {
    return await Auth.findByIdAndUpdate(id, payload, { new: true });
  },

  deleteAuth: async (id: string): Promise<IAuthDocument | null> => {
    return await Auth.findByIdAndDelete(id);
  },

  // ✅ New professional method for logout
  findUsersWithValidRefreshTokens: async (): Promise<IAuthDocument[]> => {
    return await Auth.find({
      "refreshTokens.expiresAt": { $gt: new Date() },
    }).exec();
  },
};
