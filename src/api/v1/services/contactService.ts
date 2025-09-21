import { contactRepository } from "../repository";
import { IContact } from "../types/contacttypes";
import { MESSAGES } from "../../../message/messages";

// Create Contact
export const createContactService = async (payload: IContact) => {
  try {
    const createdContact = await contactRepository.createContact(payload);
    return {
      success: true,
      message: MESSAGES.CONTACT.CREATE_SUCCESS,
      data: createdContact,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Get All Contacts
export const getContactsService = async () => {
  try {
    const contacts = await contactRepository.findAllContacts();
    return {
      success: true,
      message: MESSAGES.CONTACT.FETCH_SUCCESS,
      data: contacts,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Update Contact
export const updateContactService = async (id: string, payload: IContact) => {
  try {
    const updatedContact = await contactRepository.updateContact(id, payload);
    if (!updatedContact) {
      return { success: false, message: MESSAGES.CONTACT.UPDATE_FAILED };
    }
    return { success: true, message: MESSAGES.CONTACT.UPDATE_SUCCESS, data: updatedContact };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// Delete Contact
export const deleteContactService = async (id: string) => {
  try {
    const deletedContact = await contactRepository.deleteContact(id);
    if (!deletedContact) {
      return { success: false, message: MESSAGES.CONTACT.DELETE_FAILED };
    }
    return { success: true, message: MESSAGES.CONTACT.DELETE_SUCCESS, data: deletedContact };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
