import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/uploadImageCloudinary.js";
import Category from "../models/category.model.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return next(new ApiError(400, "Invalid category ID provided"));
    }

    const images = [];

    if (req.files) {
      for (const file of req.files) {
        const imageUrl = await uploadOnCloudinary(file.buffer);
        images.push({
          url: imageUrl.url,
          public_id: imageUrl.public_id,
        });
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images,
    });

    if (!product) return next(new ApiError(400, "Product creation failed!"));

    res
      .status(201)
      .json(new ApiResponse(201, "Product created successfully", product));
  } catch (error) {
    next(error);
  }
};

export const getAllProduct = async (req, res, next) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      inStock,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    // filter object to pass into the database query
    const filter = {};

    // filter by category - If the user provides a category, it filters only those products.
    if (category) {
      filter.category = category;
    }

    /* filter by price
    If minPrice or maxPrice is given:
      filter.price.$gte sets the minimum price
      filter.price.$lte sets the maximum price
    We use parseFloat() to convert from string to number
*/
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // filter by stock availability - If inStock=true, it filters only products whose stock is greater than 0
    if (inStock === "true") {
      filter.stock = { $gte: 0 };
    } else if (inStock === "false") {
      filter.stock = { $lte: 0 };
    }

    /* sorting
    Supports sorting based on query:
      priceAsc → lowest to highest
      priceDesc → highest to lowest
      newest → most recent first
*/
    let sortOption = {};
    if (sortBy === "priceAsc") sortOption.price = 1;
    if (sortBy === "priceDesc") sortOption.price = -1;
    if (sortBy === "newest") sortOption.createdAt = -1;

    /* pagination
    Calculates how many documents to skip for the given page
    E.g., page=2, limit=10 → skip = 10, so it skips first 10 products

    */
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("category", "name");

    res
      .status(200)
      .json(
        new ApiResponse(200, "All products fetched successfully", products)
      );
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate(
      "category",
      "name slug"
    );

    if (!product) return next(new ApiError(404, "Product not found"));

    res
      .status(200)
      .json(new ApiResponse(200, "Product fetched successfully", product));
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) return next(new ApiError(404, "Product does not exist"));

    const { name, description, price, category, stock } = req.body;

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return next(new ApiError(400, "Invalid category ID provided"));
      }
      product.category = category;
    }

    if (req.files && req.files.length > 0) {
      for (const img of product.images) {
        await deleteFromCloudinary(img.public_id);
      }

      const newImages = [];
      for (const file of req.files) {
        const imageUrl = await uploadOnCloudinary(file.buffer);
        newImages.push(imageUrl);
      }
      product.images = newImages;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    await product.save();

    res
      .status(200)
      .json(new ApiResponse(200, "Product updation successful", product));
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) return next(new ApiError(404, "Product does not exist"));

    const publicIds = product.images.map((img) => img.public_id);

    if (publicIds.length > 0) {
      await deleteFromCloudinary(publicIds);
    }

    await product.deleteOne();

    res.status(200).json(new ApiResponse(200, "Product deleted successfully"));
  } catch (error) {
    next(error);
  }
};
