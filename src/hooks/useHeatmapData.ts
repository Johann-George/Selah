import { useState, useEffect, useMemo } from 'react';
import { getSessionsByUser } from '../services/sessions';

export function useHeatmapData(userId: string | null) {
  const [sessions, setSessions] = useState<{ date: string }[]>([]);
  const [loading, setLoading] = useState(!!userId);

  useEffect(() => {
    if (!userId) {
      setSessions([]);
      setLoading(false);
      return;
    }
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 12 * 7);
    getSessionsByUser(userId, {
      fromDate: start.toISOString().slice(0, 10),
      toDate: end.toISOString().slice(0, 10),
      max: 500,
    })
      .then((list) => setSessions(list.map((s) => ({ date: s.date }))))
      .finally(() => setLoading(false));
  }, [userId]);

  const heatmapData = useMemo(() => {
    const map: Record<string, number> = {};
    for (const { date } of sessions) {
      map[date] = (map[date] ?? 0) + 1;
    }
    return map;
  }, [sessions]);

  const totalSessions = sessions.length;
  return { heatmapData, totalSessions, loading };
}
