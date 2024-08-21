// AppNavigator.js
import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../Screens/SplashScreen';
import LoginStackNavigator from './LoginStackNavigator';
import MainStackNavigator from './MainStackNavigator';

const Switch = createStackNavigator();
export const navigationRef = createNavigationContainerRef();
const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <Switch.Navigator>
      <Switch.Screen
        options={{headerShown: false}}
        name="Splash"
        component={SplashScreen}
      />
      <Switch.Screen
        options={{headerShown: false}}
        name="Login"
        component={LoginStackNavigator}
      />
      <Switch.Screen
        name="Main"
        component={MainStackNavigator}
        options={{headerShown: false}}
      />
    </Switch.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
