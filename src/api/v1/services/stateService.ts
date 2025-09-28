import { stateRepository } from "../repository";
import { MESSAGES } from "../../../message/messages";
import {IState} from '../types/IState'

// Create State
export const createStateService = async (payload: IState) => {
  try {
    const createdState = await stateRepository.createState(payload);
    return {
      success: true,
      message: MESSAGES.STATE.CREATE_SUCCESS,
      data: createdState,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Get All States
export const getStateService = async () => {
  try {
    const states = await stateRepository.findAllStates();
    return {
      success: true,
      message: MESSAGES.STATE.FETCH_SUCCESS,
      data: states,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};


// Update State
export const updateStateService = async (id: string, payload: IState) => {
  try {
    const updatedState = await stateRepository.updateState(id, payload);
    if (!updatedState) {
      return { success: false, message: MESSAGES.STATE.UPDATE_FAILED };
    }
    return {
      success: true,
      message: MESSAGES.STATE.UPDATE_SUCCESS,
      data: updatedState,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Delete State
export const deleteStateService = async (id: string) => {
  try {
    const deletedState = await stateRepository.deleteState(id);
    if (!deletedState) {
      return { success: false, message: MESSAGES.STATE.DELETE_FAILED };
    }
    return {
      success: true,
      message: MESSAGES.STATE.DELETE_SUCCESS,
      data: deletedState,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
