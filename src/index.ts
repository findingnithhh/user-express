require("dotenv").config(); // Load environment variables

import express, { Express, Request, Response } from "express";
import connectionToDatabase from "./utils/connectionToDatabase";
import userRouter from "./routes/index";
import { time } from "./middleware/requestTime";
import { errorHandler } from "./middleware/errorHandler";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import passport from "passport";
import session from "express-session";

// Import Passport configuration
import "./config/passport"; // Correct import path

const app: Express = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecretkeynghaaa123!-1",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Database connection
connectionToDatabase();

// homepage
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running on port 3000");
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use routes defined in the routes/userRoutes.ts file
app.use("/user", userRouter);

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// global error handler (Should be after route definitions)
app.use(errorHandler);

// Middleware for tracking request time
app.use(time);

export default app;
