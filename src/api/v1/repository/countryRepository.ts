import countryModel from "../../../models/countryModel";
import { ICountry } from "../types/ICountry";
import mongoose from "mongoose";
import { encodeCursor } from "../../../utils/encodeCursor";
import { decodeCursor } from "../../../utils/decodeCursor";



export const countryRepository = {
  // Create Country
  createCountry: async (payload: ICountry) => {
    const newCountry = new countryModel(payload);
    return await newCountry.save();
  },

  // Cursor Pagination
  findAllCountries: async (limit = 10, after?: string) => {
    const safeLimit = Math.min(Math.max(limit, 1), 100);
    const cursor = decodeCursor(after);

    const query: any = {};
    if (cursor) {
      query.$or = [
        { createdAt: { $lt: cursor.createdAt } },
        {
          createdAt: cursor.createdAt,
          _id: { $lt: new mongoose.Types.ObjectId(cursor.id) },
        },
      ];
    }

    const results = await countryModel
      .find(query)
      .sort({ createdAt: -1, _id: -1 })
      .limit(safeLimit + 1);

    let nextCursor: string | null = null;
    if (results.length > safeLimit) {
      const lastDoc = results.pop()!;
     nextCursor = encodeCursor(
    lastDoc.createdAt as Date, 
    lastDoc._id.toString()
  );
    }

    return {
      countries: results,
      nextCursor,
      count: results.length,
    };
  },

  // Get by ID
  findCountryById: async (id: string) => {
    return await countryModel.findById(id);
  },

  // Find One Country
  findOneCountry: async (filter: Partial<ICountry>) => {
    return await countryModel.findOne(filter);
  },

  // Update Country
  updateCountry: async (id: string, payload: Partial<ICountry>) => {
    return await countryModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
  },

  // Delete Country
  deleteCountry: async (id: string) => {
    return await countryModel.findByIdAndDelete(id);
  },
};
