import { AppError } from '../utils/AppError.js';
import { MESSAGES } from '../constants/appointment.constants.js';

export function errorMiddleware(error, _req, res, _next) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: MESSAGES.INVALID_DATA,
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: MESSAGES.SLOT_TAKEN,
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: 'Erro interno do servidor.',
  });
}

export function notFoundMiddleware(_req, res) {
  return res.status(404).json({
    success: false,
    message: 'Rota não encontrada.',
  });
}
