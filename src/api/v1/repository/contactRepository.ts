import { ContactInfoModel } from "../../../models/ContactInfoModel";
import { IContact } from "../types/contacttypes";

export const contactRepository = {
  // Create Contact
  createContact: async (payload: IContact) => {
    const newContact = new ContactInfoModel(payload);
    const savedContact = await newContact.save();
    return savedContact;
  },

  // Find All Contacts
  findAllContacts: async (filter?: Partial<IContact>) => {
    return await ContactInfoModel.find(filter || {});
  },

  // Find Contact by ID
  findContactById: async (id: string) => {
    return await ContactInfoModel.findById(id);
  },

  // Find One Contact by filter
  findOneContact: async (filter: Partial<IContact>) => {
    return await ContactInfoModel.findOne(filter);
  },

  // Update Contact
  updateContact: async (id: string, payload: Partial<IContact>) => {
    const updatedContact = await ContactInfoModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true, // Ensures schema validation on update
    });
    return updatedContact;
  },

  // Delete Contact
  deleteContact: async (id: string) => {
      return await ContactInfoModel.findByIdAndUpdate(
    id,
    { isActive: true, deletedAt: new Date() }, 
    { new: true } 
  );
  },
};
