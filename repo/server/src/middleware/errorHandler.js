const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  // 4xx messages are client-safe (validation, notFound, CORS). 5xx messages
  // come from infrastructure (Supabase/SMTP) and must NOT reach callers.
  const message = status < 500
    ? (err.message || 'Request failed')
    : 'Internal Server Error';
  if (status >= 500) {
    console.error(`[errorHandler] ${req.method} ${req.originalUrl} -> ${status}:`, err.message);
  }
  res.status(status).json({
    success: false,
    message,
    // Full diagnostics only in development.
    ...(process.env.NODE_ENV === 'development' && { detail: err.message, stack: err.stack }),
  });
};

const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
};

module.exports = { errorHandler, notFound };
