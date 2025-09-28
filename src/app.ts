import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./api/v1/routes/authRoutes";
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
import contactRoutes from "./api/v1/routes/contactRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import enquireRoutes from "./api/v1/routes/enquireRoutes";
import blogRoutes from "./api/v1/routes/blogRoutes";
import dashboardRoutes from "./api/v1/routes/dashboardRoutes";
import countryRoutes from "./api/v1/routes/countryRoutes";
import stateRoutes from "./api/v1/routes/stateRoutes";
import cityRoutes from "./api/v1/routes/cityRoutes";






import { errorHandler } from "./middleware/errorHandler";
import path from "path";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001",
      "https://zen-x-website-wivq.vercel.app","https://zenx-dashboard-lbiirs96z-ashishrahis-projects.vercel.app"
      
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/countries", countryRoutes);
app.use("/api/v1/states", stateRoutes);
app.use("/api/v1/cities", cityRoutes);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/genders", genderRoutes);
app.use("/api/v1/sizes", sizeRoutes);
app.use("/api/v1/colors", colorRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/exports", exportRoutes);
app.use("/api/v1/faq", faqRoutes);
app.use("/api/v1/tags", tagsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/banners", bannersRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/subcategories", subcategoriesRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/enquires", enquireRoutes);

app.use(errorHandler);

export default app;
