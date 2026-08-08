import LoadingSpinner from './LoadingSpinner.jsx';

export default function TimeSlotPicker({
  times,
  selectedTime,
  onSelect,
  loading,
  error,
  onRetry,
  dateSelected,
}) {
  if (!dateSelected) {
    return (
      <p className="helper-text">Selecione uma data para ver os horários disponíveis.</p>
    );
  }

  if (loading) {
    return <LoadingSpinner label="Consultando horários disponíveis..." />;
  }

  if (error) {
    return (
      <div className="alert alert-error" role="alert">
        <p>{error}</p>
        {onRetry && (
          <button type="button" className="link-button" onClick={onRetry}>
            Tentar novamente
          </button>
        )}
      </div>
    );
  }

  if (times.length === 0) {
    return (
      <p className="helper-text">
        Nenhum horário disponível para a data selecionada. Escolha outra data.
      </p>
    );
  }

  return (
    <div className="time-slots" role="listbox" aria-label="Horários disponíveis">
      {times.map((time) => (
        <button
          key={time}
          type="button"
          role="option"
          aria-selected={selectedTime === time}
          className={`time-slot ${selectedTime === time ? 'time-slot-selected' : ''}`}
          onClick={() => onSelect(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
