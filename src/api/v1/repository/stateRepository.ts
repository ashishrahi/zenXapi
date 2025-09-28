import { IState } from "../types/IState";
import stateModel from "../../../models/stateModel";

export const stateRepository = {
  // Create State
  createState: async (payload: IState) => {
    const newState = new stateModel(payload);
    const savedState = await newState.save();
    return savedState;
  },

  // Find All States
  findAllStates: async (filter?: Partial<IState>) => {
    return await stateModel.find(filter || {}).sort({ createdAt: -1 });
  },

  // Find State by ID
  findStateById: async (id: string) => {
    return await stateModel.findById(id);
  },

  // Find One State by filter (e.g., by title or slug)
  findOneState: async (filter: Partial<IState>) => {
    return await stateModel.findOne(filter);
  },

  // Update State
  updateState: async (id: string, payload: Partial<IState>) => {
    const updatedState = await stateModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return updatedState;
  },

  // Delete State
  deleteState: async (id: string) => {
    return await stateModel.findByIdAndDelete(id);
  },
};
