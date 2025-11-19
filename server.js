import { connectMongo } from "./db/db.js";
import { userRoutes } from "./routes/users.js";
import { sheetRoutes } from "./routes/sheets.js";
import { loginRoutes } from "./routes/login.js";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

export { app };

userRoutes(app);
sheetRoutes(app);
loginRoutes(app);

try {
  await connectMongo();
  const API_PORT = 3000;
  app.listen(API_PORT);
  console.log("🚀 API rodando!");
} catch (e) {
  console.log(e);
}
