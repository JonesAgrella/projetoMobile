import * as React from 'react';
 import { View, Text } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

 import HomeScreen from './screens/home';
 import NotasScreen from './screens/notas';
 import DataScreen from './screens/datas';
 import ChatScreen from './screens/chat';
 import AjusteScreen from './screens/ajustes';


 const Tab = createBottomTabNavigator();

 function App() {
     return (
     <NavigationContainer>
         <Tab.Navigator>
         <Tab.Screen name='Notas' component={NotasScreen} />
         <Tab.Screen name='Calendario' component={DataScreen} />
         <Tab.Screen name='Home' component={HomeScreen} />
         <Tab.Screen name='Chat' component={ChatScreen} />
         <Tab.Screen name='Ajustes' component={AjusteScreen} />
         </Tab.Navigator>
     </NavigationContainer>
     );
 }

 export default App;