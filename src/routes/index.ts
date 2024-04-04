import express, { Request, Response } from "express";
import { UserController } from "../controller/userController";
import { validateUser } from "../middleware/userValidation";
import { User } from "../database/models/user";
import { generateEmailVerificationToken } from "../utils/randomToken";
import Token from "../database/models/userToken";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { sendVerificationEmail } from "../utils/userEmailConfig";

const router = express.Router();
const userController = new UserController();

// login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the given email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Check if the user has verified their email
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email first." });
    }

    // Compare the password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token using the function from jwtUtils
    const token = generateToken(user._id);

    // Return success message along with the token
    res.json({ message: "Login successfully, welcome to our app.", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred while logging in." });
  }
});

// Email verification route
// router.get("/verify", async (req, res) => {
//   const { token } = req.query;

//   try {
//     // Find the token in the database
//     const tokenDoc = await Token.findOne({ token });

//     if (!tokenDoc) {
//       throw new Error("Invalid token");
//     }

//     // Update the user's isVerified status
//     const user = await User.findById(tokenDoc.userId);
//     if (!user) {
//       throw new Error("User not found");
//     }
//     user.isVerified = true;
//     await user.save();

//     // Generate JWT token after verifying the user
//     const tokenAfterVerify = generateToken(user._id);

//     // Delete the token from the database
//     await Token.deleteOne({ token });

//     res.json({ message: "User verified successfully", token: tokenAfterVerify });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.get("/verify", async (req: Request, res: Response) => {
  const { token } = req.query;

  try {
    // Find the token in the database
    let tokenDoc = await Token.findOne({ token });

    if (!tokenDoc) {
      throw new Error("Invalid token");
    }

    // Check if the token has expired
    if (tokenDoc.expiresAt < new Date()) {
      // Token has expired, delete it from the database
      await Token.deleteOne({ token });

      // Generate a new token and save it
      const newToken = await generateEmailVerificationToken(
        tokenDoc.userId.toString()
      );
      tokenDoc = new Token({ userId: tokenDoc.userId, token: newToken });
      await tokenDoc.save();

      // Send verification email with the new token
      await sendVerificationEmail(tokenDoc.userId.toString(), newToken);

      res.json({
        message: "Token expired. New token generated. Verification email sent.",
        token: newToken,
      });
      return; // Return here to prevent further execution of the code
    }

    // Update the user's isVerified status
    const user = await User.findById(tokenDoc.userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.isVerified = true;
    await user.save();

    // Generate JWT token after verifying the user
    const tokenAfterVerify = generateToken(user._id);

    // Delete the token from the database
    await Token.deleteOne({ token });

    res.json({
      message: "User verified successfully",
      token: tokenAfterVerify,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req: Request, res: Response<any>) => {
  try {
    const { email } = req.body;

    // Check if user with the given email exists
    const existingUser = await User.findOne({ email });

    // Check if user with the given email exists but not verified
    const unverifiedUser = await User.findOne({ email, isVerified: false });

    if (unverifiedUser) {
      return res.status(400).json({ message: "Please verify your email." });
    }

    if (existingUser) {
      return res.status(400).json({ message: "User already created." });
    }

    // Proceed with user creation if the user is new or already verified
    const user = await userController.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Routes without user validation
router.get("/", async (req: Request, res: Response<any>) => {
  try {
    const users = await userController.getAllUsers(req.query);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put(
  "/:userId",
  validateUser,
  async (req: Request, res: Response<any>) => {
    try {
      const userId = req.params.userId;
      const user = await userController.updateUser(userId, req.body);
      res.status(200).json(user); // Assuming updateUser returns the updated user
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete("/:userId", async (req: Request, res: Response<any>) => {
  try {
    const userId = req.params.userId;
    const user = await userController.deleteUser(userId);
    res.status(200).json(user); // Assuming deleteUser returns the deleted user
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId", async (req: Request, res: Response<any>) => {
  try {
    const userId = req.params.userId;
    const user = await userController.getUserById(userId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
