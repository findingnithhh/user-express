require("dotenv").config();
import express, { Express, Request, Response } from "express";
import connectionToDatabase from "./utils/connectionToDatabase";
import router from "./routes/index";
import { time } from "./middleware/requestTime";
import { errorHandler } from "./middleware/errorHandler";
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running on port 3001");
});
// request time
app.use(time);

// Use routes defined in the routes/index.ts file
app.use("/user", router);

// global error
app.use(errorHandler);

// connection to database
const PORT = process.env.PORT;
connectionToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});


export default app;