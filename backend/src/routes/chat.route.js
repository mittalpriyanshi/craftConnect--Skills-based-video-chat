import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";


const router= express.Router();

router.get("/", protectRoute, getStreamToken);


export default router;