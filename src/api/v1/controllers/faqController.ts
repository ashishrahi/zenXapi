import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {UserSignInResponse} from '../types/UserSignInResponse'
import { faqService } from "../services";



// createFaqController
export const createFaqController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await faqService.createFaqService(payload) as UserSignInResponse
    res.status(StatusCodes.CREATED )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error In", error });
  }
};

// getFaqController
export const getFaqController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await faqService.getFaqService(payload) as UserSignInResponse
    res.status(StatusCodes.OK )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error in", error });
  }
};

// updateFaqController
export const updateFaqController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const {id} = req.params
    const { success, message, data } = await faqService.updateFaqService(id,payload) as UserSignInResponse
    res.status(StatusCodes.OK )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error in", error });
  }
};


// deleteFaqController
export const deleteFaqController = async (req: Request, res: Response) => {
  try {
       const {id} = req.params
    const { success, message, data } = await faqService.deleteFaqService(id) as UserSignInResponse
    res.status(StatusCodes.OK )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};
