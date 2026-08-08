import { formatZodError, loginSchema } from '../validators/appointment.validator.js';
import * as authService from '../services/auth.service.js';
import { MESSAGES } from '../constants/appointment.constants.js';

export async function login(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: formatZodError(parsed.error),
      });
    }

    const result = authService.login(
      parsed.data.username,
      parsed.data.password,
    );

    return res.status(200).json({
      success: true,
      message: MESSAGES.LOGIN_SUCCESS,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
