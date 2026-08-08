import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import { useBooking } from '../contexts/BookingContext.jsx';
import { formatDateDisplay } from '../utils/date.js';
import { formatPhoneDisplay } from '../utils/phone.js';

export default function Confirmation() {
  const navigate = useNavigate();
  const { confirmedAppointment, clearConfirmedAppointment } = useBooking();

  useEffect(() => {
    if (!confirmedAppointment) {
      navigate('/agendamento', { replace: true });
    }
  }, [confirmedAppointment, navigate]);

  if (!confirmedAppointment) {
    return null;
  }

  function handleNewBooking() {
    clearConfirmedAppointment();
    navigate('/agendamento');
  }

  return (
    <section className="page confirmation-page">
      <div className="confirmation-card card">
        <div className="success-icon" aria-hidden="true">
          ✓
        </div>
        <h1>Agendamento realizado com sucesso</h1>
        <p className="lead">Sua solicitação foi registrada com os dados abaixo.</p>

        <dl className="confirmation-details">
          <div>
            <dt>Nome</dt>
            <dd>{confirmedAppointment.name}</dd>
          </div>
          <div>
            <dt>Telefone</dt>
            <dd>{formatPhoneDisplay(confirmedAppointment.phone)}</dd>
          </div>
          <div>
            <dt>Serviço</dt>
            <dd>{confirmedAppointment.service}</dd>
          </div>
          <div>
            <dt>Data</dt>
            <dd>{formatDateDisplay(confirmedAppointment.date)}</dd>
          </div>
          <div>
            <dt>Horário</dt>
            <dd>{confirmedAppointment.time}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{confirmedAppointment.status}</dd>
          </div>
        </dl>

        <div className="confirmation-actions">
          <Button onClick={handleNewBooking}>Novo agendamento</Button>
          <Link to="/" className="text-link" onClick={clearConfirmedAppointment}>
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  );
}
