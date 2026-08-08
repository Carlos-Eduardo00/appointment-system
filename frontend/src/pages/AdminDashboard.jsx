import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentTable from '../components/AppointmentTable.jsx';
import Button from '../components/Button.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Input from '../components/Input.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  deleteAppointment,
  listAppointments,
  updateAppointmentStatus,
} from '../services/appointmentService.js';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { token, username, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState('');

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await listAppointments(token, {
        date: dateFilter || undefined,
        sortBy: 'date',
        sortOrder: 'desc',
      });
      setAppointments(response.data.appointments);
    } catch (requestError) {
      setAppointments([]);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [token, dateFilter]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  function handleLogout() {
    logout();
    navigate('/admin');
  }

  function handleClearFilter() {
    setDateFilter('');
  }

  async function handleStatusChange(id, status) {
    setActionError('');
    setActionLoadingId(id);

    try {
      await updateAppointmentStatus(token, id, status);
      await loadAppointments();
    } catch (requestError) {
      setActionError(requestError.message);
    } finally {
      setActionLoadingId('');
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      'Deseja excluir definitivamente este agendamento? Esta ação não pode ser desfeita.',
    );

    if (!confirmed) {
      return;
    }

    setActionError('');
    setActionLoadingId(id);

    try {
      await deleteAppointment(token, id);
      await loadAppointments();
    } catch (requestError) {
      setActionError(requestError.message);
    } finally {
      setActionLoadingId('');
    }
  }

  return (
    <section className="page admin-dashboard-page">
      <div className="admin-dashboard-header">
        <div>
          <h1>Painel de Agendamentos</h1>
          <p className="lead">Olá, {username}. Gerencie os atendimentos cadastrados.</p>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Sair
        </Button>
      </div>

      <div className="admin-filters card">
        <Input
          id="dateFilter"
          label="Filtrar por data"
          type="date"
          value={dateFilter}
          onChange={(event) => setDateFilter(event.target.value)}
        />
        {dateFilter && (
          <Button type="button" variant="secondary" onClick={handleClearFilter}>
            Limpar filtro
          </Button>
        )}
      </div>

      <ErrorMessage message={actionError} />

      {loading ? (
        <LoadingSpinner label="Carregando agendamentos..." />
      ) : (
        <>
          <ErrorMessage message={error} onRetry={loadAppointments} />
          {!error && (
            <AppointmentTable
              appointments={appointments}
              actionLoadingId={actionLoadingId}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          )}
        </>
      )}
    </section>
  );
}
