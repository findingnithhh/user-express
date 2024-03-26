// server.ts

import app from "./index";
const PORT = process.env.PORT || 3000;

import connectionToDatabase from "./utils/connectionToDatabase";

connectionToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
