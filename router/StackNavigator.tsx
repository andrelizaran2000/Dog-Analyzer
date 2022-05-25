// Modules
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pantallas
import Home from '../screens/Home';
import Results from '../screens/Results';
import Photo from '../screens/Photo';

export type StackParams = {
  photo: {
    uri: string;
    base64: string;
  };
  home: undefined;
  results: {
    id: string;
  }
};

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: 'white' }}>
      <Stack.Screen
        name="home"
        options={{ title: 'Analizador' }}
        component={Home}
      />
      <Stack.Screen
        name="photo"
        options={{ title: 'Foto tomada' }}
        component={Photo}
      />
      <Stack.Screen
        name="results"
        options={{ title: 'Resultados' }}
        component={Results}
      />
    </Stack.Navigator>
  )
}
