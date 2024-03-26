import express from "express";
import { userController } from "../controller/userController";
import { validateUser } from "../middleware/userValidation";

const router = express.Router();

// Apply the validateUser middleware to routes that require user validation
router.post("/", validateUser, userController.createUser, (req, res) => {
  res.sendStatus(201);
});
router.put("/:userId", validateUser, userController.updateUser);

// Define other routes without user validation
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.delete("/:userId", userController.deleteUser);

export default router;
