import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { ROLES } from "../constants/roles.js";

const generateAccessRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new ApiError(401, "User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return { accessToken, refreshToken };
};

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return next(new ApiError(400, "User already exist"));

    const user = await User.create({ name, email, password });

    if (!user) {
      return next(new ApiError(400, "User registration failed!"));
    }

    res.status(201).json(new ApiResponse(201, "User created successfully"));
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new ApiError(404, "User does not exist!"));

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect)
      return next(new ApiError(401, "Invalid credentials"));

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const { accessToken, refreshToken } = await generateAccessRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, "User logged in successfully", userData));
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) return next(new ApiError(401, "Token is missing"));

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) return next(new ApiError(401, "Invalid refresh token!"));

    const { accessToken, refreshToken } = await generateAccessRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, "Access token refresh successfully!"));
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json(new ApiResponse(200, "User logout successfully!"));
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isDeleted: false }).select("-password");

    if (!users || users.length === 0) {
      return next(new ApiError(404, "No user found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, "All users fetched successfully", users));
  } catch (error) {
    next(error);
  }
};

export const updateUserByAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) return next(new ApiError(404, "User not found!"));

    const { name, email, role } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();

    res.status(200).json(new ApiResponse(200, "User updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const deleteUserByAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");
    if (!user || user.isDeleted)
      return next(new ApiError(404, "User does not exist!"));

    user.isDeleted = true;
    await user.save();

    res.status(200).json(new ApiResponse(200, "User deleted successfully"));
  } catch (error) {
    next(error);
  }
};

export const assignUserRole = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { role } = req.body;

    const allowedRoles = [ROLES.USER, ROLES.ADMIN];

    if (!role) return next(new ApiError(404, "Role is required!"));

    if (!allowedRoles.includes(role)) {
      return next(new ApiError(400, `Invalid role. Allowed roles: ${allowedRoles.join(", ")}`));
    }

    const user = await User.findById(id).select("-password");
    if (!user || user.isDeleted)
      return next(new ApiError(404, "User does not exist!"));

    user.role = role;
    await user.save();

    res.status(200).json(new ApiResponse(200, "Role assigned successfully"));
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user || user.isDeleted) {
      return next(new ApiError(404, "User not found"));
    }

    res.status(200).json(new ApiResponse(200, "User profile fetched", user));
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || user.isDeleted) {
      return next(new ApiError(404, "User not found"));
    }

    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    res.status(200).json(new ApiResponse(200, "Profile updated successfully"));
  } catch (error) {
    next(error);
  }
};

// Get Single User by Admin
export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");
    if (!user || user.isDeleted) {
      return next(new ApiError(404, "User not found"));
    }

    res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
  } catch (error) {
    next(error);
  }
};
