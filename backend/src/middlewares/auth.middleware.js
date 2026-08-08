import { MESSAGES } from '../constants/appointment.constants.js';
import * as authService from '../services/auth.service.js';

export function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: MESSAGES.UNAUTHORIZED,
    });
  }

  const token = authorization.slice(7);

  try {
    req.admin = authService.verifyToken(token);
    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: MESSAGES.UNAUTHORIZED,
    });
  }
}
