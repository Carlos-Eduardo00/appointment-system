export function sendSuccess(res, { status = 200, message, data = null }) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}

export function sendError(res, { status = 400, message }) {
  return res.status(status).json({
    success: false,
    message,
  });
}
