import {
  READ_ITEMS,
  READ_PHOTOS,
  LOGIN,
  UPDATE_USER,
  READ_HELP,
  READ_ABOUT,
  CHANGE_PASSWORD,
  FILTER_PRACTICES,
  READ_ALL_SUBSESSIONS,
  READ_TEAM_NEWS,
  READ_CHAT_CONFIG,
  READ_CHAT_ROOMS,
} from './types';

export function readPhotos(dispatch) {
  return function (payload) {
    dispatch({
      type: READ_PHOTOS,
      payload: payload,
    });
  };
}

export function readItems(dispatch) {
  return function (payload) {
    dispatch({
      type: READ_ITEMS,
      payload: payload,
    });
  };
}

export function login(dispatch) {
  return function (payload) {
    dispatch({
      type: LOGIN,
      payload: payload,
    });
  };
}

export function updateUser(dispatch) {
  return function (payload) {
    dispatch({
      type: UPDATE_USER,
      payload: payload,
    });
  };
}

export function changePassword(dispatch) {
  return function (payload) {
    dispatch({
      type: CHANGE_PASSWORD,
      payload: payload,
    });
  };
}

export function readHelp(dispatch) {
  return function (payload) {
    dispatch({
      type: READ_HELP,
      payload: payload,
    });
  };
}

export function readAbout(dispatch) {
  return function (payload) {
    dispatch({
      type: READ_ABOUT,
      payload: payload,
    });
  };
}

export function filterPractices(dispatch) {
  return function (payload) {
    dispatch({
      type: FILTER_PRACTICES,
      payload: payload ? payload : {},
    });
  };
}

export function readAllSubsessions(dispatch) {
  return function (payload) {
    dispatch({
      type: READ_ALL_SUBSESSIONS,
      payload: payload,
    });
  };
}

export function readTeamNews(dispatch) {
  return function (payload) {
    dispatch({
      type: READ_TEAM_NEWS,
      payload: payload,
    });
  };
}

export function readChatConfig(dispatch) {
  return function (payload) {
    dispatch({
      type: READ_CHAT_CONFIG,
      payload: payload,
    });
  };
}

export function readChatRooms(dispatch) {
  return function (payload) {
    dispatch({
      type: READ_CHAT_ROOMS,
      payload: payload,
    });
  };
}
