import Button from './Button.jsx';
import { formatDateDisplay } from '../utils/date.js';
import { formatPhoneDisplay } from '../utils/phone.js';
import {
  canDeleteAppointment,
  getAllowedStatusActions,
} from '../utils/adminStatus.js';

function StatusBadge({ status }) {
  const className = `status-badge status-${status.toLowerCase()}`;
  return <span className={className}>{status}</span>;
}

export default function AppointmentTable({
  appointments,
  actionLoadingId,
  onStatusChange,
  onDelete,
}) {
  if (appointments.length === 0) {
    return (
      <div className="empty-state card">
        <p>Nenhum agendamento encontrado para os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="appointments-table-wrapper card">
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Serviço</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            const actions = getAllowedStatusActions(appointment.status);
            const isLoading = actionLoadingId === appointment.id;

            return (
              <tr key={appointment.id}>
                <td data-label="Cliente">
                  <strong>{appointment.name}</strong>
                  <span className="table-subtext">
                    {formatPhoneDisplay(appointment.phone)}
                  </span>
                </td>
                <td data-label="Serviço">{appointment.service}</td>
                <td data-label="Data">{formatDateDisplay(appointment.date)}</td>
                <td data-label="Horário">{appointment.time}</td>
                <td data-label="Status">
                  <StatusBadge status={appointment.status} />
                </td>
                <td data-label="Ações">
                  <div className="table-actions">
                    {actions.map((action) => (
                      <Button
                        key={action.status}
                        type="button"
                        variant="secondary"
                        className={`btn-small ${action.className}`}
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={() => onStatusChange(appointment.id, action.status)}
                      >
                        {action.label}
                      </Button>
                    ))}

                    {canDeleteAppointment(appointment.status) && (
                      <Button
                        type="button"
                        variant="secondary"
                        className="btn-small btn-danger-outline"
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={() => onDelete(appointment.id)}
                      >
                        Excluir
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
