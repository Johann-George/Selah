import { useState, useEffect } from 'react';
import { getSessionsByUser } from '../services/sessions';

export function useTodaySession(userId: string | null) {
  const [duration, setDuration] = useState(0);
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(!!userId);

  useEffect(() => {
    if (!userId) {
      setDuration(0);
      setReference('');
      setLoading(false);
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    getSessionsByUser(userId, { fromDate: today, toDate: today })
      .then((sessions) => {
        const total = sessions.reduce((acc, s) => acc + s.duration, 0);
        const ref = sessions[0]?.bibleReference ?? '';
        setDuration(total);
        setReference(ref);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { duration, reference, loading };
}
