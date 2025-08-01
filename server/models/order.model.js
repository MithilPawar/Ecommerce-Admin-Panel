import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //Reference to the customer placing the order.
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId, //Array of items in the order.
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalAmount: {
      type: Number, //total order amount of the products
      required: true,
    },
    paymentStatus: {
      type: String, //Can be useful to integrate Stripe/PayPal later.
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String, //For admin to manage order flow.
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },
    isDeleted: {
      type: Boolean, //Soft deletion (like we did for users).
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
