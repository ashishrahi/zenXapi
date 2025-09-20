import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {UserSignInResponse} from '../types/UserSignInResponse'
import { tagService } from "../services";



// createTagController
export const createTagController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await tagService.createTagService(payload) as UserSignInResponse
    res.status(StatusCodes.CREATED )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error In", error });
  }
};

// getTagController
export const getTagController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = await tagService.getTagService(payload) as UserSignInResponse
    res.status(StatusCodes.OK )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error in", error });
  }
};

// updateTagController
export const updateTagController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const {id} = req.params
    const { success, message, data } = await tagService.updateTagService(id,payload) as UserSignInResponse
    res.status(StatusCodes.OK )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error in", error });
  }
};


// deleteTagController
export const deleteTagController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const { success, message, data } = await tagService.deleteTagService(id) as UserSignInResponse
    res.status(StatusCodes.OK )
       .json({ success, message, data });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .json({ message: "Error signing in", error });
  }
};
