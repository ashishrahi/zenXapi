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

// Ensure upload directory exists
const ensureDirExist = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// ---------------- Multer Disk Storage ----------------
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

// ---------------- File Filter ----------------
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  console.log("Incoming file:", file.originalname);

  const allowedTypes = /jpeg|jpg|png|webp|avif/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

// ---------------- Multer Instance ----------------
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

// ---------------- Cloudinary Upload Helper ----------------
export const uploadToCloudinary = async (
  files: Express.Multer.File[],
  folder = "images"
): Promise<string[]> => {
  const urls: string[] = [];

  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path, { folder });
    urls.push(result.secure_url);

    // Delete local file after successful upload
    fs.unlink(file.path, (err) => {
      if (err) console.error("Failed to delete local file:", err);
    });
  }

  return urls;
};
