import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ---------------- Cloudinary Config ----------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// ---------------- Multer Setup ----------------
const ensureDirExist = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = "uploads/images";
    ensureDirExist(uploadFolder);
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, name);
  },
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

// Multer instance
export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// ---------------- Cloudinary Upload Helper ----------------
export const uploadToCloudinary = async (files: Express.Multer.File[], folder = "categories"): Promise<string[]> => {
  const urls: string[] = [];

  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path, { folder });
    urls.push(result.secure_url);

    // Optional: remove local file after upload
    fs.unlink(file.path, (err) => {
      if (err) console.error("Failed to delete local file:", err);
    });
  }

  return urls;
};
