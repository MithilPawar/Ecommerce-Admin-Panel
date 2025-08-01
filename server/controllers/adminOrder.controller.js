import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Order from "../models/order.model.js";
import { allowedStatus, allowedPaymentStatus } from "../constants/status.js";

// 1. Get all orders
export const getALlOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json(new ApiResponse(200, "All orders fetched successfully", orders));
  } catch (error) {
    next(error);
  }
};

// 2. Get a single order by ID
export const getSingleOrder = async (req, res, next) => {
  try {
    const id = req.params.id;

    const order = await Order.findById(id).populate("user", "name email");

    if (!order) {
      return next(new ApiError(404, "Order not found!"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Order fetched successfully", order));
  } catch (error) {
    next(error);
  }
};

// 3. Update order status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const id = req.params.id;

    if (!allowedStatus.includes(status)) {
      return next(new ApiError(400, "Invalid order status"));
    }

    const order = await Order.findById(id);
    if (!order) {
      return next(new ApiError(404, "Order not found!"));
    }

    order.status = status;
    await order.save();

    res
      .status(200)
      .json(new ApiResponse(200, "Order status updated successfully", order));
  } catch (error) {
    next(error);
  }
};

// 4. Soft delete order (mark as deleted)
export const deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.id;

    const order = await Order.findById(id);
    if (!order) {
      return next(new ApiError(404, "Order not found!"));
    }

    order.isDeleted = true;
    await order.save();

    res.status(200).json(new ApiResponse(200, "Order deleted successfully"));
  } catch (error) {
    next(error);
  }
};

// 5. Filter orders by status
export const filterOrders = async (req, res, next) => {
  try {
    const { status, payment } = req.query;

    const query = {};

    // Validate only if `status` is provided
    if (status) {
      if (!allowedStatus.includes(status)) {
        return next(new ApiError(400, "Invalid order status"));
      }
      query.orderStatus = status;
    }

    if (payment) {
      if (!allowedPaymentStatus.includes(payment)) {
        return next(new ApiError(400, "Invalid payment status"));
      }
      query.paymentStatus = payment;
    }

    const orders = await Order.find(query).populate("user", "name email");

    res
      .status(200)
      .json(
        new ApiResponse(200, "Filtered orders fetched successfully", orders)
      );
  } catch (error) {
    next(error);
  }
};
