const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    message: err.message || "Internal server error",
  };

  if(err.errors && Object.keys(err.errors).length > 0) {
    response.validationError = err.errors
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
