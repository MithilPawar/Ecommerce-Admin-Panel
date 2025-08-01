import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const paymentStatuses = ["pending", "paid", "failed"];
const orderStatuses = ["processing", "shipped", "delivered", "cancelled"];

const fakeShippingInfo = () => ({
  address: "123 Kalewadi",
  city: "Pune",
  postalCode: "411001",
  country: "India",
  phone: "9860195619",
});

const seedFakeOrders = async (count = 10) => {
  try {
    const users = await User.find({ role: "user", isDeleted: false });
    if (users.length === 0) {
      console.error("❌ No user found with role 'user'");
      process.exit(1);
    }

    const allProducts = await Product.find({ stock: { $gt: 0 } });
    if (allProducts.length === 0) {
      console.error("❌ No products with stock found");
      process.exit(1);
    }

    for (let i = 0; i < count; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const selectedProducts = allProducts
        .sort(() => 0.5 - Math.random()) // shuffle
        .slice(0, Math.floor(Math.random() * 3) + 1); // pick 1-3

      const orderItems = [];
      let totalAmount = 0;

      for (const product of selectedProducts) {
        const quantity = Math.floor(Math.random() * 3) + 1;

        if (product.stock < quantity) continue;

        product.stock -= quantity;
        await product.save();

        orderItems.push({
          product: product._id,
          quantity,
        });

        totalAmount += product.price * quantity;
      }

      if (orderItems.length === 0) continue;

      await Order.create({
        user: user._id,
        products: orderItems,
        totalAmount,
        paymentStatus:
          paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
        orderStatus:
          orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
        shippingInfo: fakeShippingInfo(),
      });

      console.log(`✅ Fake order ${i + 1} created`);
    }

    console.log(`🎉 Seeding complete: ${count} orders generated`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedFakeOrders(10);
