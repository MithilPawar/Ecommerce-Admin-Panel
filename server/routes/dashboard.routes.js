import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { authorizedRole } from "../middlewares/authorize.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.get("/stats", verifyJWT, authorizedRole(ROLES.ADMIN), getDashboardStats);

export default router;
