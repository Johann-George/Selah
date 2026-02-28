import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReadScreen } from '../screens/ReadScreen';
import { ReflectionScreenConnected } from '../screens/ReflectionScreenConnected';
import type { ReflectionTabParamList } from '../types';
import { colors, typography } from '../theme';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

const Tab = createMaterialTopTabNavigator<ReflectionTabParamList>();

function ReflectionHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Reflection</Text>
      <Text style={styles.subtitle}>Read the Word, then reflect on what you've received</Text>
    </View>
  );
}

export function ReflectionTabs() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ReflectionHeader />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: typography.body,
          tabBarIndicatorStyle: { backgroundColor: colors.primary },
          tabBarStyle: { backgroundColor: colors.background },
          tabBarShowIcon: true,
        }}
      >
        <Tab.Screen
          name="Read"
          component={ReadScreen}
          options={{ 
            tabBarLabel: 'Read',
            tabBarIcon: () => <Entypo name="open-book" size={4} color="black" />,
          }}
        />
        <Tab.Screen
          name="Reflect"
          component={ReflectionScreenConnected}
          options={{ 
            tabBarLabel: 'Reflect',
            tabBarIcon: ({ color }) => <AntDesign name="mobile" size={24} color="black" />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12, backgroundColor: colors.background },
  title: { ...typography.h1, color: colors.text, marginBottom: 4 },
  subtitle: { ...typography.bodySmall, color: colors.textSecondary },
});
