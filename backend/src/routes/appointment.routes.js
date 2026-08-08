import { Router } from 'express';
import {
  createAppointment,
  deleteAppointment,
  getAvailableTimes,
  listAppointments,
  updateStatus,
} from '../controllers/appointment.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/available', getAvailableTimes);
router.post('/', createAppointment);
router.get('/', authMiddleware, listAppointments);
router.patch('/:id/status', authMiddleware, updateStatus);
router.delete('/:id', authMiddleware, deleteAppointment);

export default router;
