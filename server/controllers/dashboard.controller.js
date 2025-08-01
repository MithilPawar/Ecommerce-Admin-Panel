import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenueAgg = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });

    res.status(200).json(
      new ApiResponse(200, "Dashboard stats fetched", {
        totalOrders,
        totalRevenue,
        totalProducts,
        totalUsers,
      })
    );
  } catch (err) {
    next(err);
  }
};
