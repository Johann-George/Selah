import React from 'react';
import { ProgressScreen } from './ProgressScreen';
import { useAuthContext } from '../context/AuthContext';
import { useHeatmapData } from '../hooks/useHeatmapData';

export function ProgressScreenConnected() {
  const user = useAuthContext();
  const { heatmapData, totalSessions } = useHeatmapData(user.id);

  return (
    <ProgressScreen
      heatmapData={heatmapData}
      totalSessions={totalSessions}
    />
  );
}
