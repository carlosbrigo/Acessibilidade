import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pages from './src/pages';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>      
      <Stack.Navigator initialRouteName='Rastreio'>
      <Stack.Screen
          name="Rastreio"
          component={Pages.Rastreio}
          options={{
            headerShown: false,
            title: "Navegar",
            headerStyle: { backgroundColor: "#75f542" },
            headerTintColor: "#000000",
            headerTitleStyle:
            {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }} />
        <Stack.Screen
          name="AreaRestrita"
          component={Pages.AreaRestrita}
          options={{
            title: "Area Administrativa",
            headerStyle: { backgroundColor: "#75f542" },
            headerTintColor: "#000000",
            headerTitleStyle:
            {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }} />
        <Stack.Screen
          name="Home"
          component={Pages.Home}
          options={{
            title: "Acessibilidade",
            headerStyle: { backgroundColor: "#75f542" },
            headerTintColor: "#000000",
            headerTitleStyle:
            {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
        <Stack.Screen
          name="Login"
          component={Pages.Login}
          options={{
            //headerShown: false,
            title: "Logar",
            headerStyle: { backgroundColor: "#75f542" },
            headerTintColor: "#000000",
            headerTitleStyle:
            {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}