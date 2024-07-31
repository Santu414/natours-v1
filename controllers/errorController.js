const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}. ${err.reason ? err.reason.message : ''}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue ? err.keyValue.name : 'unknown';
  const message = `Duplicate field value: "${value}". Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational error, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  // Set default error status and message if they don't exist
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // Create a detailed copy of the error object
    let error = {
      ...err,
      message: err.message,
      name: err.name,
      stack: err.stack,
      stringValue: err.stringValue,
      messageFormat: err.messageFormat,
      kind: err.kind,
      value: err.value,
      path: err.path,
      reason: err.reason,
      valueType: err.valueType
    };

    console.log("Error before handling:", error);

    // Handle specific error types
    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }

    console.log("Error after handling:", error);

    sendErrorProd(error, res);
  }
};

