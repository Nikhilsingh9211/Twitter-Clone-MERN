import express from "express";
import { signin, signup } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup); // Route for user registration
router.post("/signin", signin); // Route for user login

export default router;
