import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProgressScreen } from './ProgressScreen';
import { useAuthContext } from '../context/AuthContext';
import { useHeatmapData } from '../hooks/useHeatmapData';

export function ProgressScreenConnected() {
  const user = useAuthContext();
  const navigation = useNavigation();
  const { heatmapData, totalSessions } = useHeatmapData(user.id);

  return (
    <ProgressScreen
      heatmapData={heatmapData}
      totalSessions={totalSessions}
      onBack={() => navigation.goBack()}
    />
  );
}
