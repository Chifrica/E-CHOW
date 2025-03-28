import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const AppLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'homePage':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'exploreScreen':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'orderScreen':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'scheduleScreen':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'notificationScreen':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            default:
              iconName = focused ? 'home' : 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E58945',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tabs.Screen name="homePage" options={{ title: 'Home' }} />
      <Tabs.Screen name="exploreScreen" options={{ title: 'Explore' }} />
      <Tabs.Screen name="orderScreen" options={{ title: 'My Orders' }} />
      <Tabs.Screen name="scheduleScreen" options={{ title: 'Schedule' }} />
      <Tabs.Screen name="notificationScreen" options={{ title: 'Notification' }} />
    </Tabs>
  );
};

export default AppLayout;