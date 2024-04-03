// import express, { Request, Response } from "express";
// import { UserController } from "../controller/userController";
// import { validateUser } from "../middleware/userValidation";
// // import { verifyEmailToken } from "../utils/jwt"; // Import the token verification function
// import { User } from "../database/models/user";
// import { generateEmailVerificationToken } from "../utils/randomToken";
// import Token from "../database/models/userToken";

// const router = express.Router();
// const userController = new UserController();

// // Routes that require user validation
// router.post("/", validateUser, async (req: Request, res: Response<any>) => {
//   try {
//     const user = await userController.createUser(req.body);
//     res.status(201).json(user); // Assuming createUser returns the created user
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.put(
//   "/:userId",
//   validateUser,
//   async (req: Request, res: Response<any>) => {
//     try {
//       const userId = req.params.userId;
//       const user = await userController.updateUser(userId, req.body);
//       res.status(200).json(user); // Assuming updateUser returns the updated user
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// );

// router.delete("/:userId", async (req: Request, res: Response<any>) => {
//   try {
//     const userId = req.params.userId;
//     const user = await userController.deleteUser(userId);
//     res.status(200).json(user); // Assuming deleteUser returns the deleted user
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Routes without user validation
// router.get("/", async (req: Request, res: Response<any>) => {
//   try {
//     const users = await userController.getAllUsers(req.query);
//     res.status(200).json(users);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get("/:userId", async (req: Request, res: Response<any>) => {
//   try {
//     const userId = req.params.userId;
//     const user = await userController.getUserById(userId);
//     res.status(200).json(user);
//   } catch (error: any) {
//     res.status(404).json({ error: error.message });
//   }
// });



// // Email verification route
// router.get("/verify", async (req: Request, res: Response) => {
//   console.log("hello");
//   const { token } = req.query; // Use req.params to access the token
//   console.log("token:", token);

//   try {
//     // Find the token in the database
//     // const tokenDoc = await Token.findOne({ token });
//     // console.log(tokenDoc);

//     // if (!tokenDoc) {
//     //   throw new Error("Invalid token");
//     // }

//     // // Update the user's isVerified status
//     // const user = await User.findById(tokenDoc.userId);
//     // if (!user) {
//     //   throw new Error("User not found");
//     // }
//     // user.isVerified = true;
//     // await user.save();

//     // // Delete the token from the database
//     // await Token.deleteOne({ token });

//     res.json({ message: "User verified successfully" });
//   } catch (err: any) {
//     res.json({ message: err.message });
//   }
// });

// export default router;
