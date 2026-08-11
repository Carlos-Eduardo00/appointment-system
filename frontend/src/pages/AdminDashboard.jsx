import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentTable from '../components/AppointmentTable.jsx';
import Button from '../components/Button.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Input from '../components/Input.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Select from '../components/Select.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  deleteAppointment,
  listAppointments,
  updateAppointmentStatus,
} from '../services/appointmentService.js';
import { formatPhoneInput } from '../utils/phone.js';

const FILTER_FIELDS = {
  name: {
    label: 'Nome',
    inputType: 'text',
    placeholder: 'Ex.: Rodrigo',
  },
  phone: {
    label: 'Telefone',
    inputType: 'tel',
    placeholder: 'Ex.: (11) 99999-9999',
  },
  date: {
    label: 'Data',
    inputType: 'date',
    placeholder: '',
  },
  time: {
    label: 'Horário',
    inputType: 'time',
    placeholder: '',
  },
};

function filterByTime(appointments, timeValue) {
  if (!timeValue) {
    return appointments;
  }

  return appointments.filter((appointment) => appointment.time.startsWith(timeValue));
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { token, username, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filterType, setFilterType] = useState('name');
  const [filterValue, setFilterValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState('');

  const activeFilter = FILTER_FIELDS[filterType];

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const apiFilters = {
        sortBy: 'date',
        sortOrder: 'desc',
      };

      if (filterValue) {
        if (filterType === 'name') {
          apiFilters.name = filterValue.trim();
        }

        if (filterType === 'phone') {
          apiFilters.phone = filterValue;
        }

        if (filterType === 'date') {
          apiFilters.date = filterValue;
        }
      }

      const response = await listAppointments(token, apiFilters);
      let items = response.data.appointments;

      if (filterType === 'time' && filterValue) {
        items = filterByTime(items, filterValue);
      }

      setAppointments(items);
    } catch (requestError) {
      setAppointments([]);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [token, filterType, filterValue]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  function handleLogout() {
    logout();
    navigate('/admin');
  }

  function handleFilterTypeChange(event) {
    setFilterType(event.target.value);
    setFilterValue('');
  }

  function handleFilterValueChange(event) {
    const { value } = event.target;

    if (filterType === 'phone') {
      setFilterValue(formatPhoneInput(value));
      return;
    }

    setFilterValue(value);
  }

  function handleClearFilters() {
    setFilterValue('');
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
        <Select
          id="filterType"
          label="Filtro"
          value={filterType}
          onChange={handleFilterTypeChange}
        >
          <option value="name">Nome</option>
          <option value="phone">Telefone</option>
          <option value="date">Data</option>
          <option value="time">Horário</option>
        </Select>

        <Input
          id="filterValue"
          label={activeFilter.label}
          type={activeFilter.inputType}
          value={filterValue}
          placeholder={activeFilter.placeholder}
          step={filterType === 'time' ? 1800 : undefined}
          onChange={handleFilterValueChange}
        />

        {filterValue && (
          <Button type="button" variant="secondary" onClick={handleClearFilters}>
            Limpar Filtros
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
