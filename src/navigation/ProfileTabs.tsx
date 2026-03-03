import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProgressScreenConnected } from '../screens/ProgressScreenConnected';
import { ActivitiesScreenConnected } from '../screens/ActivitiesScreenConnected';
import { ProfileScreenConnected } from '../screens/ProfileScreenConnected';
import { UserDetailsScreenConnected } from '../screens/UserDetailsScreenConnected';
import { SettingsScreenConnected } from '../screens/SettingsScreenConnected';
import type { ProfileTabParamList } from '../types';

const Stack = createNativeStackNavigator<ProfileTabParamList>();

export function ProfileTabs() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProfileInfo"
    >
      <Stack.Screen name="ProfileInfo" component={ProfileScreenConnected} />
      <Stack.Screen name="Progress" component={ProgressScreenConnected} />
      <Stack.Screen name="Activities" component={ActivitiesScreenConnected} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreenConnected} />
      <Stack.Screen name="Settings" component={SettingsScreenConnected} />
    </Stack.Navigator>
  );
}
