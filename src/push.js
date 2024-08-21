// import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import {NavigationActions} from 'react-navigation';

import axiosInstance from './api';
// import {navigatorRef} from '../App';
// import {Alert} from 'react-native';

async function configurePushNotifications(token) {
  // Alert.alert("Firebase token", JSON.stringify(token));

  const userId = async () => {
    const userString = await AsyncStorage.getItem('user');
    if (userString !== null) {
      const userJson = await JSON.parse(userString);
      return userJson.id;
    } else {
      return;
    }
  };

  const id = await userId();

  // Alert.alert("token", token);

  // console.log("USER ID", id);

  if (id) {
    await axiosInstance.post('patch/user/' + id, {
      fcm_token: token,
    });
    // .then((res) => {
    //   console.log(res.data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  } else {
    return;
  }
}

export default configurePushNotifications;
