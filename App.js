import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import RecadoScreen from './screens/recados';
import NotasScreen from './screens/notas';
import DataScreen from './screens/datas';
import ChatScreen from './screens/chat';
import AjusteScreen from './screens/ajustes';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          // Ícones do Tab Navigator
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

          // Cores dos icônes ativos/inativos
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#8c8e91ff',

          // Texto das labels
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },

          // Estilo arredondado da barra
          tabBarStyle: {
            position: 'absolute',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#f9a825',
            height: 70,
            paddingBottom: 8,
            paddingTop: 8,
            // sombra
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});

export default App;
