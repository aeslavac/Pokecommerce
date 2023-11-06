// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeSplash from './Screen/HomeSplash';
import PokemonDetailsPage from './Screen/PokemonDetailsPage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeSplash} />
        <Stack.Screen name="PokemonDetails" component={PokemonDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
