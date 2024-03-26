import { Request, Response, NextFunction } from "express";

// Global error handler middleware
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Default to 500 if no status code is set
  const statusCode = res.statusCode || 500;

  // Send response to client
  res.status(statusCode).json({
    statusCode: statusCode,
    message: err.message,
  });
  next();
}

export { errorHandler };
