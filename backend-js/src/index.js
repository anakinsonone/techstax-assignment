import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import { WorkflowRouter } from "./routes/WorkflowRoutes.js";
const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;
const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to Mongo DB: ", error);
  }
};
connectDB();
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Add router to server
app.use("/api/workflows", WorkflowRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
