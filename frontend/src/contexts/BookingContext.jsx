import { createContext, useContext, useMemo, useState } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  const value = useMemo(
    () => ({
      confirmedAppointment,
      setConfirmedAppointment,
      clearConfirmedAppointment: () => setConfirmedAppointment(null),
    }),
    [confirmedAppointment],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error('useBooking deve ser usado dentro de BookingProvider.');
  }

  return context;
}
