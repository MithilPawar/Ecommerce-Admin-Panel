import express from "express";
import {
  getSingleCategory,
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import {verifyJWT} from "../middlewares/verifyJWT.js";
import {authorizedRole} from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.get("/:id", getSingleCategory);
router.get("/", getAllCategory);

router.post("/", verifyJWT, authorizedRole("admin"), createCategory);
router.put("/:id", verifyJWT, authorizedRole("admin"), updateCategory);
router.delete("/:id", verifyJWT, authorizedRole("admin"), deleteCategory);

export default router;
