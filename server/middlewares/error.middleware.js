export const errorHandler = (err, req, res, next) => {
  const message = err.message || "Internal Server Error || Something went wrong!";
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
