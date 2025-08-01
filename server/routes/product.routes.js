import {
  createProduct,
  getSingleProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { productSchema } from "../validators/product.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authorizedRole } from "../middlewares/authorize.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import express from "express";

const router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getSingleProduct);

router.post(
  "/",
  verifyJWT,
  authorizedRole("admin"),
  validate(productSchema),
  upload.array("images"),
  createProduct
);

router.put(
  "/:id",
  verifyJWT,
  authorizedRole("admin"),
  validate(productSchema),
  upload.array("images"),
  updateProduct
);

router.delete("/:id", verifyJWT, authorizedRole("admin"), deleteProduct);

export default router;
