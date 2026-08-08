import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';

export function login(username, password) {
  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminUser || !adminPassword || !jwtSecret) {
    throw new AppError('Configuração administrativa incompleta.', 500);
  }

  if (username !== adminUser || password !== adminPassword) {
    throw new AppError('Usuário ou senha inválidos.', 401);
  }

  const token = jwt.sign({ role: 'admin', username: adminUser }, jwtSecret, {
    expiresIn: '8h',
  });

  return { token, username: adminUser };
}

export function verifyToken(token) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new AppError('Configuração JWT incompleta.', 500);
  }

  return jwt.verify(token, jwtSecret);
}
