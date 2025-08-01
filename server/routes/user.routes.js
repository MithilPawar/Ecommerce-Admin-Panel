import {
  loginSchema,
  registerSchema,
} from "../validators/userValidationSchema.js";
import {
  login,
  register,
  refreshAccessToken,
  logout,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
  assignUserRole,
  getUserById,
} from "../controllers/user.controller.js";
import { ROLES } from "../constants/roles.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authorizedRole } from "../middlewares/authorize.middleware.js";
import express from "express";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);
router.get("/users/:id", verifyJWT, authorizedRole(ROLES.ADMIN), getUserById);
router.get("/refresh-token", refreshAccessToken);
router.post("/logout", logout);
router.get(
  "/admin/users/getUsers",
  verifyJWT,
  authorizedRole(ROLES.ADMIN),
  getAllUsers
);
router.put(
  "/admin/users/:id",
  verifyJWT,
  authorizedRole(ROLES.ADMIN),
  updateUserByAdmin
);
router.delete(
  "/admin/users/:id",
  verifyJWT,
  authorizedRole(ROLES.ADMIN),
  deleteUserByAdmin
);
router.put(
  "/admin/users/:id/role",
  verifyJWT,
  authorizedRole(ROLES.ADMIN),
  assignUserRole
);
export default router;
