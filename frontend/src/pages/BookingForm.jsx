import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Input from '../components/Input.jsx';
import Select from '../components/Select.jsx';
import TimeSlotPicker from '../components/TimeSlotPicker.jsx';
import { SERVICES } from '../constants/appointment.js';
import { useBooking } from '../contexts/BookingContext.jsx';
import { useAvailableTimes } from '../hooks/useAvailableTimes.js';
import { createAppointment } from '../services/appointmentService.js';
import { getMaxBookingDate, getTodayString } from '../utils/date.js';
import { formatPhoneInput, normalizeName } from '../utils/phone.js';
import { hasValidationErrors, validateBookingForm } from '../utils/validation.js';

const initialForm = {
  name: '',
  phone: '',
  service: '',
  date: '',
  time: '',
};

export default function BookingForm() {
  const navigate = useNavigate();
  const { setConfirmedAppointment } = useBooking();
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { times, loading, error, reload } = useAvailableTimes(form.date);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));

    if (fieldErrors[field]) {
      setFieldErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }

    if (submitError) {
      setSubmitError('');
    }
  }

  function handleDateChange(event) {
    const date = event.target.value;

    setForm((current) => ({ ...current, date, time: '' }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next.date;
      delete next.time;
      return next;
    });

    if (submitError) {
      setSubmitError('');
    }
  }

  function handlePhoneChange(event) {
    updateField('phone', formatPhoneInput(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = validateBookingForm(form);
    setFieldErrors(errors);

    if (hasValidationErrors(errors)) {
      setSubmitError('Existem campos obrigatórios pendentes ou inválidos.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await createAppointment({
        name: normalizeName(form.name),
        phone: form.phone,
        service: form.service,
        date: form.date,
        time: form.time,
      });

      setConfirmedAppointment(response.data.appointment);
      navigate('/confirmation');
    } catch (requestError) {
      setSubmitError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page booking-page">
      <div className="page-header">
        <h1>Agendar atendimento</h1>
        <p>Preencha os dados abaixo para solicitar um horário.</p>
      </div>

      <form className="booking-form card" onSubmit={handleSubmit} noValidate>
        <Select
          id="service"
          label="Serviço"
          required
          value={form.service}
          error={fieldErrors.service}
          onChange={(event) => updateField('service', event.target.value)}
        >
          <option value="">Selecione um serviço</option>
          {SERVICES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </Select>

        <Input
          id="name"
          label="Nome completo"
          required
          value={form.name}
          error={fieldErrors.name}
          placeholder="Ex.: Carlos Eduardo"
          maxLength={100}
          onChange={(event) => updateField('name', event.target.value)}
        />

        <Input
          id="phone"
          label="Telefone"
          required
          type="tel"
          inputMode="numeric"
          value={form.phone}
          error={fieldErrors.phone}
          placeholder="(11) 99999-9999"
          onChange={handlePhoneChange}
        />

        <Input
          id="date"
          label="Data"
          required
          type="date"
          value={form.date}
          error={fieldErrors.date}
          min={getTodayString()}
          max={getMaxBookingDate()}
          onChange={handleDateChange}
        />

        <div className="form-field">
          <span className="form-label">
            Horário<span className="required-mark"> *</span>
          </span>
          <TimeSlotPicker
            times={times}
            selectedTime={form.time}
            onSelect={(time) => updateField('time', time)}
            loading={loading}
            error={error}
            onRetry={reload}
            dateSelected={Boolean(form.date)}
          />
          {fieldErrors.time && (
            <p className="field-error" role="alert">
              {fieldErrors.time}
            </p>
          )}
        </div>

        <ErrorMessage message={submitError} />

        <div className="form-actions">
          <Button type="submit" loading={submitting}>
            Confirmar agendamento
          </Button>
        </div>
      </form>
    </section>
  );
}
