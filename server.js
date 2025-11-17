import { connect } from "./db/db.js";
import { userRoutes } from "./routes/users.js";
import { sheetRoutes } from "./routes/sheets.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

export { app };

userRoutes(app);
sheetRoutes(app);

try {
  await connect();
  const API_PORT = 3000;
  app.listen(API_PORT);
  console.log("🚀 API rodando!");
} catch (e) {
  console.log(e);
}
