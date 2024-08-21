import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {navigatorRef} from '../App';
// import {NavigationActions} from 'react-navigation';

// export const baseURL = 'http://172.16.40.26/'
// export const baseURL = "https://tysapp.itcentar.rs/";
// export const baseURL = 'https://thresholdmedia.com/tysapi/public/'
export const baseURL = 'http://api.truecoachapp.com/';
// export const baseURL = 'http://192.168.1.224:8000/';
//   "http://tysapi-env.phtv62p6vf.us-east-1.elasticbeanstalk.com/";

async function getToken() {
  const userString = await AsyncStorage.getItem('user');
  if (userString !== null) {
    const userJson = await JSON.parse(userString);
    return userJson.token;
  } else {
    return;
  }
}

async function removeUser() {
  await AsyncStorage.removeItem('user');
}

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export const loginAxiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    config.headers = {
      Authorization: 'Bearer ' + (await getToken()),
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(undefined, async function (error) {
  if (error.response.status === 401) {
    await removeUser();

    // let navAction = NavigationActions.navigate({routeName: 'login'});
    // await navigatorRef.dispatch(navAction);
  }
  return Promise.reject({...error});
});

export default axiosInstance;
