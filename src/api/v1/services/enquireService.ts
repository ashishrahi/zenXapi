import { enquireRepository } from "../repository";
import { IEnquire } from "../types/enquireTypes";
import { MESSAGES } from "../../../message/messages";

// Create Enquiry
export const createEnquireService = async (payload: IEnquire) => {
  try {
    const createdEnquire = await enquireRepository.createEnquire(payload);
    return {
      success: true,
      message: MESSAGES.ENQUIRE.CREATE_SUCCESS,
      data: createdEnquire,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Get All Enquiries
export const getEnquiresService = async () => {
  try {
    const enquires = await enquireRepository.findAllEnquires();
    return {
      success: true,
      message: MESSAGES.ENQUIRE.FETCH_SUCCESS,
      data: enquires,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Update Enquiry
export const updateEnquireService = async (id: string, payload: IEnquire) => {
  try {
    const updatedEnquire = await enquireRepository.updateEnquire(id, payload);
    if (!updatedEnquire) {
      return { success: false, message: MESSAGES.ENQUIRE.UPDATE_FAILED };
    }
    return { success: true, message: MESSAGES.ENQUIRE.UPDATE_SUCCESS, data: updatedEnquire };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Delete Enquiry
export const deleteEnquireService = async (id: string) => {
  try {
    const deletedEnquire = await enquireRepository.deleteEnquire(id);
    if (!deletedEnquire) {
      return { success: false, message: MESSAGES.ENQUIRE.DELETE_FAILED };
    }
    return { success: true, message: MESSAGES.ENQUIRE.DELETE_SUCCESS, data: deletedEnquire };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
