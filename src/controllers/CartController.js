import CartModel from "../models/CartModel.js";
import ProductModel from "../models/ProductModel.js";

const CartController = {
    createCart: async (req, res) => {
        try {
            const { user, userName, items } = req.body;

            if (!user || !userName || !items || !Array.isArray(items)) {
                return res.status(400).json({ message: "Dados inválidos" });
            }

            let total = 0;

            for (const item of items) {
                if (!item.product || !item.name || item.price == null || item.quantity == null) {
                    return res.status(400).json({ message: "Dados incompletos em um dos itens" });
                }
                total += item.quantity * item.price;
            }

            const newCart = await CartModel.create({
                user,
                userName,
                items,
                totalPrice: total,
            });

            res.status(201).json({ message: "Pedido registrado com sucesso", cart: newCart });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllCarts: async (req, res) => {
        try {
            const result = await CartModel.find()
                .populate("user")
                .populate("items.product");

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default CartController;
