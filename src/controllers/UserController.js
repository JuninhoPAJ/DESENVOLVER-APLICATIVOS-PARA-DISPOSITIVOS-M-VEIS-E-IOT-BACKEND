import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.js";
import CartModel from "../models/CartModel.js"
import aiService from "../services/IaService.js";

const userController = {
    createUser: async (req, res) => {
        try {
            const { name, email, cpf, password } = req.body;

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email já está em uso" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await UserModel.create({ name, email, cpf, password: hashedPassword });

            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const result = await UserModel.findById(req.params.id);
            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const result = await UserModel.findByIdAndDelete(req.params.id);
            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateUserById: async (req, res) => {
        try {
            const result = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    promptWithGemini: async (req, res) => {
        try {
            const result = await aiService.prompt(req.body.prompt)
            res.status(200).json(result.text());
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    longContext: async (req, res) => {
        const pdfPath = "./src/context/Currículo - Jonildo 2025.pdf"
        const result = await aiService.longContext(req.body.prompt, pdfPath)
        res.status(200).json(result.text());
    },

    chatAboutAllCarts: async (req, res) => {
        try {
            const { prompt } = req.body;

            const carts = await CartModel.find(); // pega TODOS os carrinhos

            if (!carts || carts.length === 0) {
                return res.status(404).json({ message: "Nenhuma compra encontrada." });
            }

            const resumos = carts.map(cart => cart.resumoTexto).filter(Boolean);

            if (resumos.length === 0) {
                return res.status(400).json({ message: "Nenhum resumo disponível." });
            }

            const result = await aiService.allCartsContext(prompt, resumos);
            res.status(200).json(result.text());
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    loginUser: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: "Senha incorreta" });
            }

            res.status(200).json({
                message: "Login bem-sucedido",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    cpf: user.cpf
                }
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

export default userController;