// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LogbookScreen from './screens/LogbookScreen';

// Tu dodamy w przyszłości inne ekrany
// import LogbookScreen from './screens/LogbookScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Menu Główne' }} 
        />
        <Stack.Screen 
          name="Logbook" 
          component={LogbookScreen} 
          options={{ title: 'Dziennik Wpisów' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}