// HomeStack.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Trainings from '../Screens/trainings';
import Sessions from '../Screens/sessions';
import Subsessions from '../Screens/subsessions';
import Practices from '../Screens/practices';
// import * as screen from './screens';

const Stack = createStackNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
      name="Trainings"
      component={Trainings}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Sessions"
      component={Sessions}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Subsessions"
      component={Subsessions}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Practices"
      component={Practices}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default HomeStackNavigator;
