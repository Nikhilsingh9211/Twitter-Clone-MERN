import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";

const app = express();
dotenv.config(); // Load environment variables from .env file

// Function to connect to MongoDB
const connect = () => {
  mongoose
    .connect(process.env.MONGO) // Use MONGO environment variable from .env
    .then(() => {
      console.log("connected to Mongodb database");
    })
    .catch((err) => {
      throw new err();
    });
};

// Route for the home page
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(cookieParser()); // Parse cookies in incoming requests
app.use(express.json()); // Parse JSON bodies in incoming requests

// Define routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/auth", authRoutes); // Authentication-related routes
app.use("/api/tweets", tweetRoutes); // Tweet-related routes

app.listen(8000, () => {
  connect(); // Connect to MongoDB when the server starts
  console.log("Listening on port 8000");
});
