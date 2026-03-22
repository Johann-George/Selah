import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReadScreen } from '../screens/ReadScreen';
import { ReflectionScreenConnected } from '../screens/ReflectionScreenConnected';
import { Header } from '../components';
import { useAuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import type { ReflectionTabParamList } from '../types';
import { useColors, typography } from '../theme';

const Tab = createMaterialTopTabNavigator<ReflectionTabParamList>();

export function ReflectionTabs() {
  const colors = useColors();
  const user = useAuthContext();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header
        title="Reflection"
        subtitle="Read the Word, then reflect on what you've received"
        showProfile
        userName={user.name}
        onProfilePress={() => navigation.navigate('Profile' as never)}
      />
      <Tab.Navigator
        initialRouteName="Reflect"
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: { ...typography.bodySmall, fontFamily: 'Inter_500Medium' },
          tabBarIndicatorStyle: { backgroundColor: colors.primary, height: 2, borderRadius: 2 },
          tabBarStyle: { backgroundColor: colors.background, elevation: 0, shadowOpacity: 0 },
          tabBarShowIcon: false,
        }}
      >
        <Tab.Screen name="Read" component={ReadScreen} options={{ tabBarLabel: 'Read' }} />
        <Tab.Screen name="Reflect" component={ReflectionScreenConnected} options={{ tabBarLabel: 'Reflect' }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
