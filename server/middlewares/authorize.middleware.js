import ApiError from "../utils/ApiError.js";

export const authorizedRole = (...alllowedRoles) => {
  return (req, res, next) => {
    if (!alllowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(403, `Access Denied : ${req.user.role} not allowed`)
      );
    }
    next();
  };
};
