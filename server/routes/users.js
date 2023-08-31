import express from "express";
import {
  getUser,
  update,
  deleteUser,
  follow,
  unFollow,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
// Update user
router.get("/:id", verifyToken, update);
// get user
router.get("/find/:id", getUser);
// Delete user
router.delete("/:id", verifyToken, deleteUser);
//follow
router.put("/follow/:id", verifyToken, follow);
//unFollow
router.put("/unfollow/:id", verifyToken, unFollow);

export default router;
