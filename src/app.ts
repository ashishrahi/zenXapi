import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./api/v1/routes/userRoutes";
import productRoutes from "./api/v1/routes/userRoutes";
import categoriesRoutes from "./api/v1/routes/categoryRoutes"
import subcategoriesRoutes from "./api/v1/routes/subcategoryRoutes"
import genderRoutes from "./api/v1/routes/genderRoute"
import sizeRoutes from "./api/v1/routes/sizeRoute"


import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/subcategories", subcategoriesRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/genders", genderRoutes);
app.use("/api/v1/sizes", sizeRoutes);






app.use(errorHandler);

export default app;
