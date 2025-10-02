import { ICity } from "../types/ICity";
import cityModel from "../../../models/cityModel";

export const cityRepository = {
  // Create City
  createCity: async (payload: ICity) => {
    const newCity = new cityModel(payload);
    const savedCity = await newCity.save();
    return savedCity;
  },

  // Find All Cities
 // Service function ko update karo
findAllCities: async (filter?: Partial<ICity>) => {
  return await cityModel.find(filter || {})
    .populate('stateId','name')
    .sort({ createdAt: -1 });
},

  // Find City by ID
  findCityById: async (id: string) => {
    return await cityModel.findById(id);
  },

  // Find One City by filter (e.g., by name or code)
  findOneCity: async (filter: Partial<ICity>) => {
    return await cityModel.findOne(filter);
  },

  // Update City
  updateCity: async (id: string, payload: Partial<ICity>) => {
    const updatedCity = await cityModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return updatedCity;
  },

  // Delete City
  deleteCity: async (id: string) => {
      return await cityModel.findByIdAndUpdate(
    id,
    { isActive: true, deletedAt: new Date() }, // mark as deleted
    { new: true } // return the updated document
  );
  },
};
