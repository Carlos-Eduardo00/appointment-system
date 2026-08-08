import { useCallback, useEffect, useState } from 'react';
import { fetchAvailableTimes } from '../services/appointmentService.js';

export function useAvailableTimes(date) {
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTimes = useCallback(async (selectedDate) => {
    if (!selectedDate) {
      setTimes([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetchAvailableTimes(selectedDate);
      setTimes(response.data.times);
    } catch (requestError) {
      setTimes([]);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTimes(date);
  }, [date, loadTimes]);

  return {
    times,
    loading,
    error,
    reload: () => loadTimes(date),
  };
}
