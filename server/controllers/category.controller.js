import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import slugify from "slugify";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return new ApiError(404, "Name is required!");

    const existCategory = await Category.findOne({ name });
    if (existCategory) return new ApiError(400, "Category is already present!");

    const category = await Category.create({ name });

    res
      .status(201)
      .json(new ApiResponse(201, "Category is created successfully", category));
  } catch (error) {
    next(error);
  }
};

export const getSingleCategory = async (req, res, next) => {
  try {
    const id = req.params.id;

    const category = await Category.findById(id);
    if (!category) return new ApiError(404, "Category is not exist!");

    res
      .status(200)
      .json(new ApiResponse(200, "Category fetched successfully", category));
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    res
      .status(200)
      .json(
        new ApiResponse(200, "Categories fetched successfully!", categories)
      );
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;

    const category = await Category.findById(id);
    if (!category) return new ApiError(404, "Category does not exist!");

    const { name } = req.body;
    if (!name) return next(new ApiError(400, "Name is required!"));

    const updated = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res
      .status(200)
      .json(new ApiResponse(200, "Category updated successfully", updated));
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleted = await Category.findById(id);
    if (!deleted) return next(new ApiError(404, "Category not found!"));

    // Preventing the category from deleting if product belongs to that category is present
    const productOfCategory = await Product.find({ category: id });
    if (productOfCategory.length > 0) {
      return next(
        new ApiError(400, "Cannot delete category. Products are using it.")
      );
    }
    await Category.findByIdAndDelete(id);

    res
      .status(200)
      .json(new ApiResponse(200, "Category Deleted successfully!"));
  } catch (error) {
    next(error);
  }
};
