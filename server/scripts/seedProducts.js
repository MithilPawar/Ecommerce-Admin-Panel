// scripts/seedProducts.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name: "Wireless Headphones",
    description: "Noise cancelling Bluetooth headphones",
    price: 2999,
    stock: 25,
    categoryName: "Electronics",
  },
  {
    name: "Men's T-Shirt",
    description: "Cotton round-neck T-shirt",
    price: 499,
    stock: 100,
    categoryName: "Clothing",
  },
  {
    name: "Non-stick Frying Pan",
    description: "Durable and easy-to-clean kitchen essential",
    price: 799,
    stock: 40,
    categoryName: "Home & Kitchen",
  },
];

const seedProducts = async () => {
  try {
    for (const item of products) {
      const category = await Category.findOne({ name: item.categoryName });
      if (!category) {
        console.warn(`⚠️ Category not found for ${item.name}`);
        continue;
      }

      const existing = await Product.findOne({ name: item.name });
      if (!existing) {
        await Product.create({
          name: item.name,
          description: item.description,
          price: item.price,
          stock: item.stock,
          category: category._id,
        });
        console.log(`✅ Created product: ${item.name}`);
      }
    }
    console.log("🎉 Product seeding complete");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

seedProducts();
