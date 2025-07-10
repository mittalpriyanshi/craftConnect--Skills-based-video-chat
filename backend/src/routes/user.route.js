import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",protectRoute, getRecommendedUsers);


export default router;
