import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    return {
      folder: "zenx/categories", 
      format: file.mimetype.split("/")[1], 
      public_id: Date.now().toString(), 
    };
  },
});

export const upload = multer({ storage });
