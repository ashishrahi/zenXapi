// src/utils/imageUpload.ts

import { Express } from "express";
import { uploadToCloudinary } from "../middleware/upload"

export const handleImageUpload = async (files?: Express.Multer.File[]): Promise<string[]> => {
  if (!files || files.length === 0) return [];
  return await uploadToCloudinary(files, "banners");
};
