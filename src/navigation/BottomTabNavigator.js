// BottomTabNavigator.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomeStack from './HomeStack';
// import * as screen from './screens';
// import Icon from './components/icon';
import HomeStackNavigator from './HomeStackNavigator';

import Icon from '../components/icon';
import Team from '../Screens/team';
import Goals from '../Screens/goals';
import Account from '../Screens/account';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({focused}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home_orange' : 'home_gray';
        } else if (route.name === 'News') {
          iconName = focused ? 'users_orange' : 'users_gray';
        } else if (route.name === 'Goals') {
          iconName = focused ? 'goals_orange' : 'goals_gray';
        } else if (route.name === 'Account') {
          iconName = focused ? 'user_orange' : 'user_gray';
        }

        return <Icon icon={iconName} focused={focused} />;
      },
      unmountOnBlur: true,
    })}
    tabBarOptions={{
      activeTintColor: '#2D2927',
      inactiveTintColor: '#8f8f8f',
      keyboardHidesTabBar: true,
    }}>
    <Tab.Screen name="Home" component={HomeStackNavigator} />
    <Tab.Screen name="News" component={Team} />
    <Tab.Screen name="Goals" component={Goals} />
    <Tab.Screen name="Account" component={Account} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
