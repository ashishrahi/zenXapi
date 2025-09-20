import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./api/v1/routes/userRoutes";
import productRoutes from "./api/v1/routes/productRoutes";
import categoriesRoutes from "./api/v1/routes/categoryRoutes";
import subcategoriesRoutes from "./api/v1/routes/subcategoryRoutes";
import genderRoutes from "./api/v1/routes/genderRoute";
import sizeRoutes from "./api/v1/routes/sizeRoute";
import colorRoutes from "./api/v1/routes/colorRoutes";
import faqRoutes from "./api/v1/routes/faqRoutes";
import exportRoutes from "./api/v1/routes/exportRoutes";
import tagsRoutes from "./api/v1/routes/tagsRoutes";
import bannersRoutes from "./api/v1/routes/bannersRoutes";
import orderRoutes from "./api/v1/routes/orderRoutes";





import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/genders", genderRoutes);
app.use("/api/v1/sizes", sizeRoutes);
app.use("/api/v1/colors", colorRoutes);
// app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/exports", exportRoutes);
app.use("/api/v1/faq", faqRoutes);
app.use("/api/v1/tags", tagsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/banners", bannersRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/subcategories", subcategoriesRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);




app.use(errorHandler);

export default app;
