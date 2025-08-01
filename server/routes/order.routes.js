import express from "express";
import {
  getALlOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
  filterOrders,
} from "../controllers/adminOrder.controller.js";
import {verifyJWT} from "../middlewares/verifyJWT.js";
import { authorizedRole } from "../middlewares/authorize.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// Apply JWT and Admin role middleware for all admin order routes
router.use(verifyJWT, authorizedRole(ROLES.ADMIN));

// ✅ Route to filter orders based on query (e.g., ?status=Shipped)
router.get("/filter", filterOrders);

// Route to get all orders
router.get("/", getALlOrders);

// Route to get single order by ID
router.get("/:id", getSingleOrder);

// Route to update order status
router.put("/:id", updateOrderStatus);  // changed :orderId → :id for consistency

// Route to delete an order (soft delete)
router.delete("/:id", deleteOrder);

export default router;
