import express from "express";

import createTransactions from "../controllers/createTransactions.js";

import getTransactionsById from "../controllers/getTransations.js";

const transationRoutes = express.Router();

transationRoutes.post("/add", createTransactions);

transationRoutes.get("/user/:userId", getTransactionsById);

export default transationRoutes;
