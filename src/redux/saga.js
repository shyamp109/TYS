// import {put, call, takeEvery} from 'redux-saga/effects';
// import axiosInstance, {loginAxiosInstance} from '../api/index';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   SET_TRAININGS,
//   SET_TRAININGS_LOADING,
//   SET_TRAININGS_MESSAGE,
//   SET_SESSIONS,
//   SET_SESSIONS_LOADING,
//   SET_SESSIONS_MESSAGE,
//   SET_SUBSESSIONS,
//   SET_SUBSESSIONS_LOADING,
//   SET_SUBSESSIONS_MESSAGE,
//   SET_PRACTICES,
//   SET_PRACTICES_LOADING,
//   SET_PRACTICES_MESSAGE,
//   SET_PHOTOS,
//   SET_USER,
//   SET_LOGIN_LOADING,
//   SET_LOGIN_MESSAGE,
//   SET_HELP,
//   SET_ABOUT,
//   READ_ITEMS,
//   READ_PHOTOS,
//   READ_ABOUT,
//   READ_HELP,
//   LOGIN,
//   NAVIGATE,
//   UPDATE_USER,
//   CHANGE_PASSWORD,
//   FILTER_PRACTICES,
//   SET_FILTER_PRACTICES,
//   SET_FILTER_PRACTICES_LOADING,
//   SET_FILTER_PRACTICES_MESSAGE,
//   SET_ALL_SUBSESSIONS_LOADING,
//   SET_ALL_SUBSESSIONS_MESSAGE,
//   READ_ALL_SUBSESSIONS,
//   SET_ALL_SUBSESSIONS,
//   SET_TEAM_NEWS_LOADING,
//   SET_TEAM_NEWS_MESSAGE,
//   SET_TEAM_NEWS,
//   READ_TEAM_NEWS,
//   SET_CHAT_CONFIG_LOADING,
//   SET_CHAT_CONFIG_MESSAGE,
//   SET_CHAT_CONFIG,
//   READ_CHAT_CONFIG,
//   READ_CHAT_ROOMS,
//   SET_CHAT_ROOMS,
//   SET_CHAT_ROOMS_LOADING,
//   SET_CHAT_ROOMS_MESSAGE,
// } from './types';
// import {navigationRef} from '../navigation/AppNavigator';

// function* navigate(payload) {
//   try {
//     if (payload.payload === 'back') {
//       navigationRef.goBack();
//     } else {
//       navigationRef.navigate(payload.payload.routeName);
//     }
//   } catch (error) {
//     console.log('navigate error->', error);
//   }
// }
// export function* login(payload) {
//   let err = '';
//   try {
//     err = '0';
//     yield put({
//       type: SET_LOGIN_LOADING,
//       payload: true,
//     });
//     err = '1';
//     const response = yield loginAxiosInstance.post(
//       'api/auth/login',
//       payload.payload,
//     );
//     err = '2';
//     yield put({
//       type: SET_USER,
//       payload: response.data,
//     });
//     err = '3';
//     yield put({
//       type: SET_LOGIN_LOADING,
//       payload: false,
//     });
//     err = '4';
//     yield AsyncStorage.setItem('user', JSON.stringify(response.data));
//     err = '5';
//     yield call(navigate, {
//       payload: {
//         routeName: 'BottomTabs',
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     let message;
//     message = 'Please check your Email and Password';
//     // if (payload.payload.email.indexOf("@") !== -1) {
//     //   message = "Please check your Email and Password";
//     // } else {
//     //   message = "Please check your Username and Password";
//     // }
//     yield put({
//       type: SET_LOGIN_MESSAGE,
//       payload: message,
//     });
//     yield put({
//       type: SET_LOGIN_LOADING,
//       payload: false,
//     });
//   }
// }

// export function* updateUser(payload) {
//   try {
//     const response = yield axiosInstance.post(
//       'patch/user/' + payload.payload.id,
//       payload.payload.data,
//     );
//     yield put({
//       type: SET_USER,
//       payload: response.data,
//     });
//     yield AsyncStorage.setItem('user', JSON.stringify(response.data));
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function* changePassword(payload) {
//   try {
//     yield axiosInstance.post('chpsswd', {
//       id: payload.payload.id,
//       password: payload.payload.password,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function* readItems(payload) {
//   try {
//     const {type, training_id, session_id, subsession_id} = payload.payload;
//     if (type === 'training') {
//       yield put({
//         type: SET_TRAININGS_LOADING,
//         payload: true,
//       });
//       const response = yield axiosInstance.get('load/training/all');
//       yield put({
//         type: SET_TRAININGS,
//         payload: response.data,
//       });
//       if (!Boolean(response?.data?.length)) {
//         yield put({
//           type: SET_TRAININGS_MESSAGE,
//           payload: 'No trainings found.',
//         });
//       }
//       yield put({
//         type: SET_TRAININGS_LOADING,
//         payload: false,
//       });
//     } else if (type === 'session') {
//       yield put({
//         type: SET_SESSIONS_LOADING,
//         payload: true,
//       });
//       let postData = {
//         training_id: training_id,
//       };
//       response = yield axiosInstance.post('load/TrainingSession/all', postData);
//       yield put({
//         type: SET_SESSIONS,
//         payload: response.data,
//       });
//       if (response.data.length === 0) {
//         // if (response.data.items  ) {
//         yield put({
//           type: SET_SESSIONS_MESSAGE,
//           payload: 'No sessions found.',
//         });
//       } else {
//         yield put({
//           type: SET_SESSIONS_MESSAGE,
//           payload: '',
//         });
//       }
//       yield put({
//         type: SET_SESSIONS_LOADING,
//         payload: false,
//       });
//     } else if (type === 'subsession') {
//       yield put({
//         type: SET_SUBSESSIONS_LOADING,
//         payload: true,
//       });
//       let postData = {
//         training_id: training_id,
//         session_id: session_id,
//       };
//       response = yield axiosInstance.post(
//         'load/TrainingSessionSubsession/all',
//         postData,
//       );
//       yield put({
//         type: SET_SUBSESSIONS,
//         payload: response.data,
//       });
//       if (response.data.length === 0) {
//         // if (response.data.items === []) {
//         yield put({
//           type: SET_SUBSESSIONS_MESSAGE,
//           payload: 'No subsessions found.',
//         });
//       } else {
//         yield put({
//           type: SET_SUBSESSIONS_MESSAGE,
//           payload: '',
//         });
//       }
//       yield put({
//         type: SET_SUBSESSIONS_LOADING,
//         payload: false,
//       });
//     } else if (type === 'practice') {
//       yield put({
//         type: SET_PRACTICES_LOADING,
//         payload: true,
//       });
//       let postData = {
//         training_id: training_id,
//         session_id: session_id,
//         subsession_id: subsession_id,
//       };
//       response = yield axiosInstance.post(
//         'load/TrainingSessionSubsessionPractice/all',
//         postData,
//       );
//       yield put({
//         type: SET_PRACTICES,
//         payload: response.data,
//       });
//       if (response.data.length === 0) {
//         // if (response.data.items === []) {
//         yield put({
//           type: SET_PRACTICES_MESSAGE,
//           payload: 'No practices found.',
//         });
//       } else {
//         yield put({
//           type: SET_PRACTICES_MESSAGE,
//           payload: '',
//         });
//       }
//       yield put({
//         type: SET_PRACTICES_LOADING,
//         payload: false,
//       });
//     }
//   } catch (error) {
//     if ((type = 'training')) {
//       yield put({
//         type: SET_TRAININGS_MESSAGE,
//         payload: 'There seems to be an error. Failed to load.',
//       });
//     } else if ((type = 'session')) {
//       yield put({
//         type: SET_SESSIONS_MESSAGE,
//         payload: 'There seems to be an error. Failed to load.',
//       });
//     } else if ((type = 'subsession')) {
//       yield put({
//         type: SET_SUBSESSIONS_MESSAGE,
//         payload: 'There seems to be an error. Failed to load.',
//       });
//     } else {
//       yield put({
//         type: SET_PRACTICES_MESSAGE,
//         payload: 'There seems to be an error. Failed to load.',
//       });
//     }
//     yield put({
//       type: SET_PRACTICES_LOADING,
//       payload: false,
//     });
//   }
// }

// export function* readPhotos(payload) {
//   try {
//     const response = yield axiosInstance.get('load/photos/all');
//     yield put({
//       type: SET_PHOTOS,
//       payload: response.data,
//     });
//   } catch (error) {}
// }

// export function* readHelp(payload) {
//   try {
//     const response = yield axiosInstance.get('load/help');
//     yield put({
//       type: SET_HELP,
//       payload: response.data,
//     });
//   } catch (error) {}
// }

// export function* readAbout(payload) {
//   try {
//     const response = yield axiosInstance.get('load/about');
//     yield put({
//       type: SET_ABOUT,
//       payload: response.data,
//     });
//   } catch (error) {}
// }

// export function* filterPractices(payload) {
//   let postData = payload.payload;

//   yield put({
//     type: SET_FILTER_PRACTICES_LOADING,
//     payload: true,
//   });

//   try {
//     let response;

//     if (postData) {
//       response = yield axiosInstance.post('filter/practice', postData);
//     } else {
//       response = yield axiosInstance.get('load/practice/all');
//     }

//     if (response.data && response.data.length > 0) {
//       yield put({
//         type: SET_FILTER_PRACTICES,
//         payload: response.data,
//       });
//       yield put({
//         type: SET_FILTER_PRACTICES_MESSAGE,
//         payload: '',
//       });
//     } else {
//       yield put({
//         type: SET_FILTER_PRACTICES_MESSAGE,
//         payload: 'No practices found.',
//       });
//     }

//     yield put({
//       type: SET_FILTER_PRACTICES_LOADING,
//       payload: false,
//     });
//   } catch (error) {
//     yield put({
//       type: SET_FILTER_PRACTICES_MESSAGE,
//       payload: 'There seems to be an error. Failed to load.',
//     });

//     yield put({
//       type: SET_FILTER_PRACTICES_LOADING,
//       payload: false,
//     });
//   }
// }

// export function* readAllSubsessions(payload) {
//   yield put({
//     type: SET_ALL_SUBSESSIONS_LOADING,
//     payload: true,
//   });

//   try {
//     const response = yield axiosInstance.get('load/subsession/all');

//     if (response.data && response.data.length > 0) {
//       yield put({
//         type: SET_ALL_SUBSESSIONS,
//         payload: response.data,
//       });
//       yield put({
//         type: SET_ALL_SUBSESSIONS_MESSAGE,
//         payload: '',
//       });
//     } else {
//       yield put({
//         type: SET_ALL_SUBSESSIONS_MESSAGE,
//         payload: 'No subsessions found.',
//       });
//     }

//     yield put({
//       type: SET_ALL_SUBSESSIONS_LOADING,
//       payload: false,
//     });
//   } catch (error) {
//     yield put({
//       type: SET_ALL_SUBSESSIONS_MESSAGE,
//       payload: 'There seems to be an error. Failed to load.',
//     });

//     yield put({
//       type: SET_ALL_SUBSESSIONS_LOADING,
//       payload: false,
//     });
//   }
// }

// export function* readTeamNews(payload) {
//   yield put({
//     type: SET_TEAM_NEWS_LOADING,
//     payload: true,
//   });
//   // yield AsyncStorage.removeItem('lastId');
//   // yield AsyncStorage.removeItem('news');
//   // return
//   try {
//     // const userId = JSON.parse(yield AsyncStorage.getItem('user')).id;

//     // const lastId = yield AsyncStorage.getItem('lastId' + userId);

//     // const response = yield axiosInstance.post('mobile/news', { id: lastId ? lastId : 0 });

//     // const newsString = yield AsyncStorage.getItem('news' + userId);

//     // const newsJson = JSON.parse(newsString);

//     // if (response.data.length > 0) {
//     //   const newLastId = response.data[0].id
//     //   yield AsyncStorage.setItem('lastId' + userId, JSON.stringify(newLastId))
//     // }

//     // let newNews = []
//     // if(newsJson) {
//     //   newNews = response.data.concat(newsJson)
//     // } else {
//     //   newNews = response.data
//     // }

//     // yield AsyncStorage.setItem('news' + userId, JSON.stringify(newNews))

//     const response = yield axiosInstance.post('mobile/news', {id: 0});

//     yield put({
//       type: SET_TEAM_NEWS,
//       payload: response.data,
//     });

//     yield put({
//       type: SET_TEAM_NEWS_LOADING,
//       payload: false,
//     });
//   } catch (error) {
//     // const userId = JSON.parse(yield AsyncStorage.getItem('user')).id;

//     // const newsString = yield AsyncStorage.getItem('news' + userId);

//     // const newsJson = JSON.parse(newsString);

//     // yield put({
//     //   type: SET_TEAM_NEWS,
//     //   payload: newsJson
//     // })

//     yield put({
//       type: SET_TEAM_NEWS_MESSAGE,
//       payload: 'There seems to be an error. Failed to load most recent news.',
//     });

//     yield put({
//       type: SET_TEAM_NEWS_LOADING,
//       payload: false,
//     });
//   }
// }

// export function* readChatConfig(payload) {
//   yield put({
//     type: SET_CHAT_CONFIG_LOADING,
//     payload: true,
//   });
//   try {
//     const response = yield axiosInstance.get('get/pusher/info');

//     yield put({
//       type: SET_CHAT_CONFIG,
//       payload: response.data,
//     });

//     yield put({
//       type: SET_CHAT_CONFIG_LOADING,
//       payload: false,
//     });
//   } catch (error) {
//     yield put({
//       type: SET_CHAT_CONFIG_MESSAGE,
//       payload: 'There seems to be an error. Failed to load chat.',
//     });

//     yield put({
//       type: SET_CHAT_CONFIG_LOADING,
//       payload: false,
//     });
//   }
// }

// export function* readChatRooms(payload) {
//   yield put({
//     type: SET_CHAT_ROOMS_LOADING,
//     payload: true,
//   });
//   try {
//     const response = yield axiosInstance.get('chat/load/rooms');
//     yield put({
//       type: SET_CHAT_ROOMS,
//       payload: response.data,
//     });
//     yield put({
//       type: SET_CHAT_ROOMS_LOADING,
//       payload: false,
//     });
//   } catch (error) {
//     yield put({
//       type: SET_CHAT_ROOMS_MESSAGE,
//       payload: 'There seems to be an error. Failed to load chat rooms.',
//     });
//     yield put({
//       type: SET_CHAT_ROOMS_LOADING,
//       payload: false,
//     });
//   }
// }

// export default function* rootSaga() {
//   yield takeEvery(NAVIGATE, navigate);
//   yield takeEvery(LOGIN, login);
//   yield takeEvery(UPDATE_USER, updateUser);
//   yield takeEvery(READ_ITEMS, readItems);
//   yield takeEvery(READ_PHOTOS, readPhotos);
//   yield takeEvery(READ_HELP, readHelp);
//   yield takeEvery(READ_ABOUT, readAbout);
//   yield takeEvery(CHANGE_PASSWORD, changePassword);
//   yield takeEvery(FILTER_PRACTICES, filterPractices);
//   yield takeEvery(READ_ALL_SUBSESSIONS, readAllSubsessions);
//   yield takeEvery(READ_TEAM_NEWS, readTeamNews),
//     yield takeEvery(READ_CHAT_CONFIG, readChatConfig),
//     yield takeEvery(READ_CHAT_ROOMS, readChatRooms);
// }

import {put, call, takeEvery} from 'redux-saga/effects';
import axiosInstance, {loginAxiosInstance} from '../api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from '../navigation/AppNavigator';
// import {navigatorRef} from '../App';
// import {NavigationActions} from 'react-navigation';
import {
  SET_TRAININGS,
  SET_TRAININGS_LOADING,
  SET_TRAININGS_MESSAGE,
  SET_SESSIONS,
  SET_SESSIONS_LOADING,
  SET_SESSIONS_MESSAGE,
  SET_SUBSESSIONS,
  SET_SUBSESSIONS_LOADING,
  SET_SUBSESSIONS_MESSAGE,
  SET_PRACTICES,
  SET_PRACTICES_LOADING,
  SET_PRACTICES_MESSAGE,
  SET_PHOTOS,
  SET_USER,
  SET_LOGIN_LOADING,
  SET_LOGIN_MESSAGE,
  SET_ABOUT,
  SET_HELP,
  READ_ITEMS,
  READ_PHOTOS,
  READ_ABOUT,
  READ_HELP,
  LOGIN,
  NAVIGATE,
  UPDATE_USER,
  CHANGE_PASSWORD,
  FILTER_PRACTICES,
  SET_FILTER_PRACTICES,
  SET_FILTER_PRACTICES_MESSAGE,
  SET_FILTER_PRACTICES_LOADING,
  SET_ALL_SUBSESSIONS_LOADING,
  SET_ALL_SUBSESSIONS_MESSAGE,
  READ_ALL_SUBSESSIONS,
  SET_ALL_SUBSESSIONS,
  SET_TEAM_NEWS_LOADING,
  SET_TEAM_NEWS_MESSAGE,
  SET_TEAM_NEWS,
  READ_TEAM_NEWS,
  SET_CHAT_CONFIG_LOADING,
  SET_CHAT_CONFIG_MESSAGE,
  SET_CHAT_CONFIG,
  READ_CHAT_CONFIG,
  READ_CHAT_ROOMS,
  SET_CHAT_ROOMS,
  SET_CHAT_ROOMS_LOADING,
  SET_CHAT_ROOMS_MESSAGE,
} from './types';

// function* navigate(payload) {
//   try {
//     var navAction;
//     if (payload.payload === 'back') {
//       navAction = NavigationActions.back();
//     } else {
//       navAction = NavigationActions.navigate({
//         routeName: payload.payload.routeName,
//       });
//     }
//     navigatorRef.dispatch(navAction);
//   } catch (error) {
//     console.log(error);
//   }
// }

function* navigate(payload) {
  try {
    if (payload.payload === 'back') {
      navigationRef.goBack();
    } else {
      navigationRef.navigate(payload.payload.routeName);
    }
  } catch (error) {
    // console.log('navigate error->', error);
  }
}

export function* login(payload) {
  let err = '';
  try {
    err = '0';
    yield put({
      type: SET_LOGIN_LOADING,
      payload: true,
    });
    err = '1';
    const response = yield loginAxiosInstance.post(
      'api/auth/login',
      payload.payload,
    );
    err = '2';
    yield put({
      type: SET_USER,
      payload: response.data,
    });
    err = '3';
    yield put({
      type: SET_LOGIN_LOADING,
      payload: false,
    });
    err = '4';
    yield AsyncStorage.setItem('user', JSON.stringify(response.data));
    err = '5';
    yield call(navigate, {
      payload: {
        routeName: 'Main',
      },
    });
  } catch (error) {
    console.log(error);
    let message;
    message = 'Please check your Email and Password';
    // if (payload.payload.email.indexOf("@") !== -1) {
    //   message = "Please check your Email and Password";
    // } else {
    //   message = "Please check your Username and Password";
    // }
    yield put({
      type: SET_LOGIN_MESSAGE,
      payload: message,
    });
    yield put({
      type: SET_LOGIN_LOADING,
      payload: false,
    });
  }
}

export function* updateUser(payload) {
  try {
    const response = yield axiosInstance.post(
      'patch/user/' + payload.payload.id,
      payload.payload.data,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure Content-Type is correct
        },
      },
    );
    yield put({
      type: SET_USER,
      payload: response.data,
    });
    yield AsyncStorage.setItem('user', JSON.stringify(response.data));
  } catch (error) {}
}

export function* changePassword(payload) {
  try {
    yield axiosInstance.post('chpsswd', {
      id: payload.payload.id,
      password: payload.payload.password,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* readItems(payload) {
  const {type, training_id, session_id, subsession_id} = payload.payload;
  try {
    if (type === 'training') {
      yield put({
        type: SET_TRAININGS_LOADING,
        payload: true,
      });
      response = yield axiosInstance.get('load/training/all/true/mobile');
      console.log('response: ', response.data);

      yield put({
        type: SET_TRAININGS,
        payload: response.data,
      });
      if (response.data.length === 0) {
        yield put({
          type: SET_TRAININGS_MESSAGE,
          payload: 'No trainings found.',
        });
      }
      yield put({
        type: SET_TRAININGS_LOADING,
        payload: false,
      });
    } else if (type === 'session') {
      yield put({
        type: SET_SESSIONS_LOADING,
        payload: true,
      });
      let postData = {
        training_id: training_id,
      };
      response = yield axiosInstance.post('load/TrainingSession/all', postData);
      yield put({
        type: SET_SESSIONS,
        payload: response.data,
      });
      if (response.data.length === 0) {
        // if (response.data.items  ) {
        yield put({
          type: SET_SESSIONS_MESSAGE,
          payload: 'No sessions found.',
        });
      } else {
        yield put({
          type: SET_SESSIONS_MESSAGE,
          payload: '',
        });
      }
      yield put({
        type: SET_SESSIONS_LOADING,
        payload: false,
      });
    } else if (type === 'subsession') {
      yield put({
        type: SET_SUBSESSIONS_LOADING,
        payload: true,
      });
      let postData = {
        training_id: training_id,
        session_id: session_id,
      };
      response = yield axiosInstance.post(
        'load/TrainingSessionSubsession/all',
        postData,
      );
      yield put({
        type: SET_SUBSESSIONS,
        payload: response.data,
      });
      if (response.data.length === 0) {
        // if (response.data.items === []) {
        yield put({
          type: SET_SUBSESSIONS_MESSAGE,
          payload: 'No subsessions found.',
        });
      } else {
        yield put({
          type: SET_SUBSESSIONS_MESSAGE,
          payload: '',
        });
      }
      yield put({
        type: SET_SUBSESSIONS_LOADING,
        payload: false,
      });
    } else if (type === 'practice') {
      yield put({
        type: SET_PRACTICES_LOADING,
        payload: true,
      });
      let postData = {
        training_id: training_id,
        session_id: session_id,
        subsession_id: subsession_id,
      };
      response = yield axiosInstance.post(
        'load/TrainingSessionSubsessionPractice/all',
        postData,
      );
      yield put({
        type: SET_PRACTICES,
        payload: response.data,
      });
      if (response.data.length === 0) {
        // if (response.data.items === []) {
        yield put({
          type: SET_PRACTICES_MESSAGE,
          payload: 'No practices found.',
        });
      } else {
        yield put({
          type: SET_PRACTICES_MESSAGE,
          payload: '',
        });
      }
      yield put({
        type: SET_PRACTICES_LOADING,
        payload: false,
      });
    }
  } catch (error) {
    if (type === 'training') {
      yield put({
        type: SET_TRAININGS_MESSAGE,
        payload: 'There seems to be an error. Failed to load.',
      });
    } else if (type === 'session') {
      yield put({
        type: SET_SESSIONS_MESSAGE,
        payload: 'There seems to be an error. Failed to load.',
      });
    } else if (type === 'subsession') {
      yield put({
        type: SET_SUBSESSIONS_MESSAGE,
        payload: 'There seems to be an error. Failed to load.',
      });
    } else {
      yield put({
        type: SET_PRACTICES_MESSAGE,
        payload: 'There seems to be an error. Failed to load.',
      });
    }
    yield put({
      type: SET_PRACTICES_LOADING,
      payload: false,
    });
  }
}

export function* readPhotos(payload) {
  try {
    const response = yield axiosInstance.get('load/photos/all');
    yield put({
      type: SET_PHOTOS,
      payload: response.data,
    });
  } catch (error) {}
}

export function* readHelp(payload) {
  try {
    const response = yield axiosInstance.get('load/help');
    yield put({
      type: SET_HELP,
      payload: response.data,
    });
  } catch (error) {}
}

export function* readAbout(payload) {
  try {
    const response = yield axiosInstance.get('load/about');
    yield put({
      type: SET_ABOUT,
      payload: response.data,
    });
  } catch (error) {}
}

export function* filterPractices(payload) {
  let postData = payload.payload;

  yield put({
    type: SET_FILTER_PRACTICES_LOADING,
    payload: true,
  });

  try {
    let response;

    if (postData) {
      response = yield axiosInstance.post('filter/practice', postData);
    } else {
      response = yield axiosInstance.get('load/practice/all');
    }

    if (response.data && response.data.length > 0) {
      yield put({
        type: SET_FILTER_PRACTICES,
        payload: response.data,
      });
      yield put({
        type: SET_FILTER_PRACTICES_MESSAGE,
        payload: '',
      });
    } else {
      yield put({
        type: SET_FILTER_PRACTICES_MESSAGE,
        payload: 'No practices found.',
      });
    }

    yield put({
      type: SET_FILTER_PRACTICES_LOADING,
      payload: false,
    });
  } catch (error) {
    yield put({
      type: SET_FILTER_PRACTICES_MESSAGE,
      payload: 'There seems to be an error. Failed to load.',
    });

    yield put({
      type: SET_FILTER_PRACTICES_LOADING,
      payload: false,
    });
  }
}

export function* readAllSubsessions(payload) {
  yield put({
    type: SET_ALL_SUBSESSIONS_LOADING,
    payload: true,
  });

  try {
    const response = yield axiosInstance.get('load/subsession/all');
    console.log('response: ', response.data);

    if (response.data && response.data.length > 0) {
      yield put({
        type: SET_ALL_SUBSESSIONS,
        payload: response.data,
      });
      yield put({
        type: SET_ALL_SUBSESSIONS_MESSAGE,
        payload: '',
      });
    } else {
      yield put({
        type: SET_ALL_SUBSESSIONS_MESSAGE,
        payload: 'No subsessions found.',
      });
    }

    yield put({
      type: SET_ALL_SUBSESSIONS_LOADING,
      payload: false,
    });
  } catch (error) {
    yield put({
      type: SET_ALL_SUBSESSIONS_MESSAGE,
      payload: 'There seems to be an error. Failed to load.',
    });

    yield put({
      type: SET_ALL_SUBSESSIONS_LOADING,
      payload: false,
    });
  }
}

export function* readTeamNews(payload) {
  yield put({
    type: SET_TEAM_NEWS_LOADING,
    payload: true,
  });
  // yield AsyncStorage.removeItem('lastId');
  // yield AsyncStorage.removeItem('news');
  // return
  try {
    // const userId = JSON.parse(yield AsyncStorage.getItem('user')).id;

    // const lastId = yield AsyncStorage.getItem('lastId' + userId);

    // const response = yield axiosInstance.post('mobile/news', { id: lastId ? lastId : 0 });

    // const newsString = yield AsyncStorage.getItem('news' + userId);

    // const newsJson = JSON.parse(newsString);

    // if (response.data.length > 0) {
    //   const newLastId = response.data[0].id
    //   yield AsyncStorage.setItem('lastId' + userId, JSON.stringify(newLastId))
    // }

    // let newNews = []
    // if(newsJson) {
    //   newNews = response.data.concat(newsJson)
    // } else {
    //   newNews = response.data
    // }

    // yield AsyncStorage.setItem('news' + userId, JSON.stringify(newNews))

    const response = yield axiosInstance.post('mobile/news', {id: 0});
    console.log('response: ', response.data);

    yield put({
      type: SET_TEAM_NEWS,
      payload: response.data,
    });

    yield put({
      type: SET_TEAM_NEWS_LOADING,
      payload: false,
    });
  } catch (error) {
    // const userId = JSON.parse(yield AsyncStorage.getItem('user')).id;

    // const newsString = yield AsyncStorage.getItem('news' + userId);

    // const newsJson = JSON.parse(newsString);

    // yield put({
    //   type: SET_TEAM_NEWS,
    //   payload: newsJson
    // })

    yield put({
      type: SET_TEAM_NEWS_MESSAGE,
      payload: 'There seems to be an error. Failed to load most recent news.',
    });

    yield put({
      type: SET_TEAM_NEWS_LOADING,
      payload: false,
    });
  }
}

export function* readChatConfig(payload) {
  yield put({
    type: SET_CHAT_CONFIG_LOADING,
    payload: true,
  });
  try {
    const response = yield axiosInstance.get('get/pusher/info');

    yield put({
      type: SET_CHAT_CONFIG,
      payload: response.data,
    });

    yield put({
      type: SET_CHAT_CONFIG_LOADING,
      payload: false,
    });
  } catch (error) {
    yield put({
      type: SET_CHAT_CONFIG_MESSAGE,
      payload: 'There seems to be an error. Failed to load chat.',
    });

    yield put({
      type: SET_CHAT_CONFIG_LOADING,
      payload: false,
    });
  }
}

export function* readChatRooms(payload) {
  yield put({
    type: SET_CHAT_ROOMS_LOADING,
    payload: true,
  });
  try {
    const response = yield axiosInstance.get('chat/load/rooms');
    yield put({
      type: SET_CHAT_ROOMS,
      payload: response.data,
    });
    yield put({
      type: SET_CHAT_ROOMS_LOADING,
      payload: false,
    });
  } catch (error) {
    yield put({
      type: SET_CHAT_ROOMS_MESSAGE,
      payload: 'There seems to be an error. Failed to load chat rooms.',
    });
    yield put({
      type: SET_CHAT_ROOMS_LOADING,
      payload: false,
    });
  }
}

export default function* rootSaga() {
  yield takeEvery(NAVIGATE, navigate);
  yield takeEvery(LOGIN, login);
  yield takeEvery(UPDATE_USER, updateUser);
  yield takeEvery(READ_ITEMS, readItems);
  yield takeEvery(READ_PHOTOS, readPhotos);
  yield takeEvery(READ_HELP, readHelp);
  yield takeEvery(READ_ABOUT, readAbout);
  yield takeEvery(CHANGE_PASSWORD, changePassword);
  yield takeEvery(FILTER_PRACTICES, filterPractices);
  yield takeEvery(READ_ALL_SUBSESSIONS, readAllSubsessions);
  yield takeEvery(READ_TEAM_NEWS, readTeamNews),
    yield takeEvery(READ_CHAT_CONFIG, readChatConfig),
    yield takeEvery(READ_CHAT_ROOMS, readChatRooms);
}
