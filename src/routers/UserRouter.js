import express from "express";
import userController from "../controllers/UserController.js";

const router = express.Router();

router.route("/user")
    .post((req, res) => userController.createUser(req, res));

router.route("/login")
    .post((req, res) => userController.loginUser(req, res))

router.route("/ia")
    .post((req, res) => userController.promptWithGemini(req, res));

router.route("/longContext")
    .post((req, res) => userController.longContext(req, res));

router.route("/user:id")
    .get((req, res) => userController.getUserById(req, res))
    .delete((req, res) => userController.deleteUserById(req, res))
    .put((req, res) => userController.updateUserById(req, res));

export default router;
