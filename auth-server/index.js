// authentication-server/index.js
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const PORT = 3001;

app.use(express.json());
app.use("/user", userRoutes);

console.log("index backend");
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log("Connected  To MongoDB");
    console.log(`Authentication Server running on port ${PORT}`);
  });
});
