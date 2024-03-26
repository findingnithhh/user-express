// app.ts

require("dotenv").config();
import express, { Express, Request, Response } from "express";
import connectionToDatabase from "./utils/connectionToDatabase";
import router from "./routes/index";
import { time } from "./middleware/requestTime";
import { errorHandler } from "./middleware/errorHandler";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running on port 3000");
});
// request time
app.use(time);

// Use routes defined in the routes/index.ts file
app.use("/user", router);

// global error
app.use(errorHandler);

export default app;
