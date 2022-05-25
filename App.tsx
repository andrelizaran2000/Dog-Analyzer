// Modules
import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

// Stacks
import StackNavigator from './router/StackNavigator';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={theme}>
        <StackNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  )
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    card: '#495371'
  },
};