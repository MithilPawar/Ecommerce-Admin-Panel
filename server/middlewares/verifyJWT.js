import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies.accessToken ||
      (authHeader &&
        authHeader.startsWith("Bearer ") &&
        authHeader.split(" ")[1]);

    if (!token) {
      return next(new ApiError(401, "Access token missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new ApiError(401, "Access token expired"));
    }

    next(new ApiError(401, "Invalid or expired access token"));
  }
};
