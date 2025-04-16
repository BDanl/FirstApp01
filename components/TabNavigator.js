// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Importa tus pantallas
import TomatoScreen from "../screens/TomatoScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import OtherScreen from "../screens/OtherScreen";
import FoodsScreen from "../screens/FoodsScreen";
// Para iconos (opcional)
 import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator style={{ 
        position: "absolute",
        bottom: 0, }} 
        screenOptions={{tabBarHideOnKeyboard: true, headerShown: false }}
        >
      <Tab.Screen 
        name="Foods" 
        component={FoodsScreen} 
         options={{
           tabBarIcon: ({ color, size }) => (
             <Ionicons name="fast-food" color={color} size={size} />
           ),
         }}
      />
      <Tab.Screen 
        name="Workout" 
        component={WorkoutScreen} 
         options={{
           tabBarIcon: ({ color, size }) => (
             <Ionicons name="fitness" color={color} size={size} />
           ),
         }}
      />
      <Tab.Screen 
        name="Tomato" 
        component={TomatoScreen} 
         options={{
           tabBarIcon: ({ color, size }) => (
             <Ionicons name="timer" color={color} size={size} />
           ),
         }}
      />
      <Tab.Screen 
        name="Other" 
        component={OtherScreen} 
         options={{
           tabBarIcon: ({ color, size }) => (
             <Ionicons name="settings" color={color} size={size} />
           ),
         }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;