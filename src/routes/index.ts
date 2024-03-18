import express from "express";
import userRoutes from './userRoute'
const router = express.Router();

router.use("/", userRoutes);

export default router;
