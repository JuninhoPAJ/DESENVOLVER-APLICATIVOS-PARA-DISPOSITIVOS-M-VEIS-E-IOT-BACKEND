import express from "express";
import productController from "../controllers/ProductController.js";

const router = express.Router();

router.route("/product")
.get((req, res) => productController.getAllProducts(req, res))

router.route("/product/:id")
.get((req, res) => productController.getProductById(req, res))

export default router;