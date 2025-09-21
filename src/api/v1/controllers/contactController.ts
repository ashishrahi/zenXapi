import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserSignInResponse } from '../types/UserSignInResponse';
import { contactService } from "../services";

// Create Contact
export const createContactController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await contactService.createContactService(payload) as UserSignInResponse;
    res.status(StatusCodes.CREATED)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error creating contact", error });
  }
};

// Get Contacts
export const getContactsController = async (req: Request, res: Response) => {
  try {
    const { success, message, data } = await contactService.getContactsService() as UserSignInResponse;
    res.status(StatusCodes.OK)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error fetching contacts", error });
  }
};

// Update Contact
export const updateContactController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const { success, message, data } = await contactService.updateContactService(id, payload) as UserSignInResponse;
    res.status(StatusCodes.OK)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error updating contact", error });
  }
};

// Delete Contact
export const deleteContactController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { success, message, data } = await contactService.deleteContactService(id) as UserSignInResponse;
    res.status(StatusCodes.OK)
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error deleting contact", error });
  }
};
