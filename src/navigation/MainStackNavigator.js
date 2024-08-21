// MainStack.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
// import * as screen from './screens';
import {View} from 'react-native';
import Icon from '../components/icon';
import OfflineVideos from '../Screens/offline_videos';
import about from '../Screens/about';
import PhotoAlbums from '../Screens/photo_albums';
import DrillManuals from '../Screens/drill_manuals';
import help from '../Screens/help';
import Privacy from '../Screens/privacy';
import TermsOfService from '../Screens/terms_of_service';
import Photo from '../Screens/photo';
import VideoScreen from '../Screens/video';
import drill_library from '../Screens/drill_library';
import CourtDiagram from '../Screens/court_diagram';
// import Icon from './components/icon';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
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
      name="BottomTabs"
      component={BottomTabNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="CourtDiagram"
      component={CourtDiagram}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="DrillManuals"
      component={DrillManuals}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="PhotoAlbums"
      component={PhotoAlbums}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="About"
      component={about}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Help" component={help} options={{headerShown: false}} />
    <Stack.Screen
      name="Privacy"
      component={Privacy}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="TermsOfService"
      component={TermsOfService}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Photo"
      component={Photo}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Video"
      component={VideoScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="DrillLibrary"
      component={drill_library}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="OfflineVideos"
      component={OfflineVideos}
      options={{headerTitle: 'Offline Videos'}}
    />
  </Stack.Navigator>
);

export default MainStackNavigator;
