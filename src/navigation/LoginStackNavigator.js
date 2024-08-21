// LoginStack.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {View} from 'react-native';

import Login from '../Screens/Login';
import Icon from '../components/icon';
import EnterEmail from '../Screens/enter_email';
import EnterCode from '../Screens/enter_code';
import EnterPassword from '../Screens/enter_password';

const Stack = createStackNavigator();

const LoginStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackImage: () => (
        <View style={{marginLeft: 5}}>
          <Icon icon="arrow_left" />
        </View>
      ),
      headerBackTitle: null,
      headerTruncatedBackTitle: null,
    }}>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="EnterEmail"
      component={EnterEmail}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="EnterCode"
      component={EnterCode}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="EnterPassword"
      component={EnterPassword}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default LoginStackNavigator;
