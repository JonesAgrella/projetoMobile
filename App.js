import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import RecadoScreen from './screens/recados';
import NotasScreen from './screens/notas';
import DataScreen from './screens/datas';
import ChatScreen from './screens/chat';
import AjusteScreen from './screens/ajustes';
import LoginScreen from './screens/loginScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//Tabs viram um componente separado
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Recados') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Notas') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Calendario') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Ajustes') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },

        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#8c8e91ff',

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },

        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#17243fff',
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.12,
          shadowRadius: 4,
          elevation: 6,
        },
      })}
    >
      <Tab.Screen name="Recados" component={RecadoScreen} />
      <Tab.Screen name="Notas" component={NotasScreen} />
      <Tab.Screen name="Calendario" component={DataScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Ajustes" component={AjusteScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
