import express from "express";
import cors from "cors";
import UserRouter from "./src/routers/UserRouter.js";
import ProductRouter from "./src/routers/ProductRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", UserRouter);
app.use("/api", ProductRouter);
dotenv.config();
mongoose.connect(process.env.MONGODB_URI)
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});