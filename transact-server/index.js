import express from "express";
import transactionRoutes from "./routes/TransactionRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/transactions", transactionRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log("Connected to Mongo DB");
    console.log(`Transaction Server running on port ${PORT}`);
  });
});
