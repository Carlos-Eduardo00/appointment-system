import mongoose from 'mongoose';
import {
  ACTIVE_STATUSES,
  SERVICES,
  STATUSES,
} from '../constants/appointment.constants.js';

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      enum: SERVICES,
    },
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    time: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):[0-5]\d$/,
    },
    status: {
      type: String,
      required: true,
      enum: STATUSES,
      default: 'Agendado',
    },
  },
  {
    timestamps: true,
  },
);

appointmentSchema.index({ date: 1, time: 1, status: 1 });
appointmentSchema.index({ phone: 1, status: 1 });
appointmentSchema.index({ name: 1 });
appointmentSchema.index(
  { date: 1, time: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ACTIVE_STATUSES } },
  },
);
appointmentSchema.index(
  { phone: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ACTIVE_STATUSES } },
  },
);

appointmentSchema.methods.toJSON = function toJSON() {
  const appointment = this.toObject();
  appointment.id = appointment._id.toString();
  delete appointment._id;
  delete appointment.__v;
  return appointment;
};

export const Appointment = mongoose.model('Appointment', appointmentSchema);
export { ACTIVE_STATUSES };
