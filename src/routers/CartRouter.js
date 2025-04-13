import express from "express";
import CartController from "../controllers/CartController.js";

const router = express.Router();

router.post("/cart", CartController.createCart);
router.get("/cart", CartController.getAllCarts);

export default router;
