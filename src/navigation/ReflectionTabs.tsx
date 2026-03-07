import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReadScreen } from '../screens/ReadScreen';
import { ReflectionScreenConnected } from '../screens/ReflectionScreenConnected';
import { Header } from '../components';
import { useAuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import type { ReflectionTabParamList } from '../types';
import { colors, typography } from '../theme';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator<ReflectionTabParamList>();

export function ReflectionTabs() {
  const user = useAuthContext();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Reflection"
        subtitle="Read the Word, then reflect on what you've received"
        showProfile={true}
        userName={user.name}
        onProfilePress={() => navigation.navigate('Profile' as never)}
      />
      <Tab.Navigator
        initialRouteName="Reflect"
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
            tabBarIcon: () => <Entypo name="open-book" size={24} color="black" />,
          }}
        />
        <Tab.Screen
          name="Reflect"
          component={ReflectionScreenConnected}
          options={{ 
            tabBarLabel: 'Reflect',
            tabBarIcon: () => <FontAwesome name="pencil-square-o" size={24} color="black" />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});
