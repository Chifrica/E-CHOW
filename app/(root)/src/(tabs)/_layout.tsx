import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const AppLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap | undefined;

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'explore') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'orders') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'schedule') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E58945',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="orders" options={{ title: 'My Orders' }} />
      <Tabs.Screen name="schedule" options={{ title: 'Schedule' }} />
      <Tabs.Screen name="notification" options={{ title: 'Notification' }} />
    </Tabs>
  );
};

export default AppLayout;