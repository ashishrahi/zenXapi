import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { authService } from "../services/index";
import { ApiResponse } from "../types/ApiResponse";

export const registerController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { success, message, data } = (await authService.registerService(
      payload
    )) as ApiResponse;

    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "server error" });
  }
};

export const loginController = async (req: Request, res: Response) => {

try {
    const payload = req.body;
    const {success, message, data} = await authService.loginService(payload) as ApiResponse
    res.status(StatusCodes.OK).json({ success, message, data });
} catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "server error" });
}

}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const {success, message, data} = await authService.refreshService(payload) as ApiResponse
    res.status(StatusCodes.OK).json({ success, message, data });
} catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "server error" });
}
};
