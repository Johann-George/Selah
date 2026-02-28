import React, { useState, useEffect } from 'react';
import { ActivitiesScreen } from './ActivitiesScreen';
import { useAuthContext } from '../context/AuthContext';
import { getSessionsByUser } from '../services/sessions';
import { signOut } from '../services/auth';
import type { Session } from '../types';

export function ActivitiesScreenConnected() {
  const user = useAuthContext();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSessionsByUser(user.id, { max: 500 })
      .then(setSessions)
      .finally(() => setLoading(false));
  }, [user.id]);

  return <ActivitiesScreen user={user} sessions={sessions} loading={loading} onSignOut={() => signOut()} />;
}
