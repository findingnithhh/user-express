import express, { Request, Response } from "express";
import { UserController } from "../controller/userController";
import { validateUser } from "../middleware/userValidation";
import { User } from "../database/models/user";
import { generateEmailVerificationToken } from "../utils/randomToken";
import Token from "../database/models/userToken";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

const router = express.Router();
const userController = new UserController();

// login
// router.post("/login", async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user with the given email exists
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password." });
//     }

//     // Compare the password with the hashed password stored in the database
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid email or password." });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, "bdkfndskfnsdkfnkdfndsfsdk", {
//       expiresIn: "1h",
//     });

//     // Return success message along with the token
//     res.json({ message: "Login successfully, welcome to our app.", token });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "An error occurred while logging in." });
//   }
// });
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the given email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
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
router.get("/verify", async (req: Request, res: Response) => {
  const { token } = req.query; // Use req.params to access the token

  try {
    // Find the token in the database
    const tokenDoc = await Token.findOne({ token });
    console.log(tokenDoc);

    if (!tokenDoc) {
      throw new Error("Invalid token");
    }

    // Update the user's isVerified status
    const user = await User.findById(tokenDoc.userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.isVerified = true;
    await user.save();

    // Delete the token from the database
    await Token.deleteOne({ token });

    res.json({ message: "User verified successfully" });
  } catch (err: any) {
    res.json({ message: err.message });
  }
});

router.post("/", async (req: Request, res: Response<any>) => {
  try {
    const { email } = req.body;

    // Check if user with the given email exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already created." });
    }

    // Check if user with the given email exists but not verified
    const unverifiedUser = await User.findOne({ email, isVerified: false });

    if (unverifiedUser) {
      return res.status(400).json({ message: "Please verify your email." });
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
