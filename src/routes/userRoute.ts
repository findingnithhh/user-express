import express, { Request, Response } from "express";
import { UserController } from "../controller/userController";
import { validateUser } from "../middleware/userValidation";

const router = express.Router();
const userController = new UserController();

// Routes that require user validation
// router.post("/", validateUser, async (req: Request, res: Response<any>) => {
//   await userController.createUser(req.body);
// });

// router.put(
//   "/:userId",
//   validateUser,
//   async (req: Request, res: Response<any>) => {
//     const userController = new UserController();
//     const userId = req.params.userId;
//     await userController.updateUser(req, userId);
//   }
// );

// // Routes without user validation
router.get("/", async (req: Request, res: Response<any>) => {
  const users = await userController.getAllUsers();
  res.send(users);
});

router.get("/:userId", async (req: Request, res: Response<any>) => {
  const userController = new UserController();
  const { userId } = req.params;
  const user = await userController.getUserById(userId);
  res.send(user);
});

// router.delete("/:userId", async (req: Request, res: Response<any>) => {
//   const userController = new UserController();
//   const userId = req.params.userId;
//   await userController.deleteUser(req, userId);
// });

export default router;
