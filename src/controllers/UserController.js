import UserModel from "../models/UserModel.js";

const userController = {
    createUser: async (req, res) => {
        try {
            const result = await UserModel.create(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const reuslt = await UserModel.findById(req.params.id);
            if (!reuslt) {
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
    }
};

export default userController;