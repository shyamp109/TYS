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
  SET_HELP,
  SET_ABOUT,
  SET_FILTER_PRACTICES,
  SET_FILTER_PRACTICES_LOADING,
  SET_FILTER_PRACTICES_MESSAGE,
  SET_ALL_SUBSESSIONS,
  SET_ALL_SUBSESSIONS_LOADING,
  SET_ALL_SUBSESSIONS_MESSAGE,
  SET_TEAM_NEWS,
  SET_TEAM_NEWS_LOADING,
  SET_TEAM_NEWS_MESSAGE,
} from './types';
import {combineReducers} from 'redux';

const initialState = {
  trainings: [],
  trainingsLoading: false,
  trainingsMessage: '',
  sessions: [],
  sessionsLoading: false,
  sessionsMessage: '',
  subsessions: [],
  subsessionsLoading: false,
  subsessionsMessage: '',
  practices: [],
  practicesLoading: false,
  practicesMessage: '',
  photos: [],
  user: {},
  loginLoading: false,
  loginMessage: '',
  help: {},
  about: {},
  filteredPractices: [],
  filterPracticesLoading: false,
  filterPracticesMessage: '',
  allSubsessions: [],
  allSubsessionsLoading: false,
  allSubsessionsMessage: '',
  teamNews: [],
  teamNewsLoading: false,
  teamNewsMessage: '',
};

export function indexReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRAININGS:
      return {...state, trainings: action.payload};
    case SET_TRAININGS_LOADING:
      return {...state, trainingsLoading: action.payload};
    case SET_TRAININGS_MESSAGE:
      return {
        ...state,
        trainingsLoading: false,
        trainingsMessage: action.payload,
      };
    case SET_SESSIONS:
      return {...state, sessions: action.payload};
    case SET_SESSIONS_LOADING:
      return {...state, sessionsLoading: action.payload};
    case SET_SESSIONS_MESSAGE:
      return {...state, sessionsMessage: action.payload};
    case SET_SUBSESSIONS:
      return {...state, subsessions: action.payload};
    case SET_SUBSESSIONS_LOADING:
      return {...state, subsessionsLoading: action.payload};
    case SET_SUBSESSIONS_MESSAGE:
      return {...state, subsessionsMessage: action.payload};
    case SET_PRACTICES:
      return {...state, practices: action.payload};
    case SET_PRACTICES_LOADING:
      return {...state, practicesLoading: action.payload};
    case SET_PRACTICES_MESSAGE:
      return {...state, practicesMessage: action.payload};
    case SET_PHOTOS:
      return {...state, photos: action.payload};
    case SET_USER:
      return {...state, user: action.payload};
    case SET_LOGIN_LOADING:
      return {...state, loginLoading: action.payload};
    case SET_LOGIN_MESSAGE:
      return {...state, loginMessage: action.payload};
    case SET_HELP:
      return {...state, help: action.payload};
    case SET_ABOUT:
      return {...state, about: action.payload};
    case SET_FILTER_PRACTICES:
      return {...state, filteredPractices: action.payload};
    case SET_FILTER_PRACTICES_LOADING:
      return {...state, filterPracticesLoading: action.payload};
    case SET_FILTER_PRACTICES_MESSAGE:
      return {...state, filterPracticesMessage: action.payload};
    case SET_ALL_SUBSESSIONS:
      return {...state, allSubsessions: action.payload};
    case SET_ALL_SUBSESSIONS_LOADING:
      return {...state, allSubsessionsLoading: action.payload};
    case SET_ALL_SUBSESSIONS_MESSAGE:
      return {...state, allSubsessionsMessage: action.payload};
    case SET_TEAM_NEWS:
      return {...state, teamNews: action.payload};
    case SET_TEAM_NEWS_LOADING:
      return {...state, teamNewsLoading: action.payload};
    case SET_TEAM_NEWS_MESSAGE:
      return {...state, teamNewsMessage: action.payload};
    default:
      return state;
  }
}

export default combineReducers({
  reducer: indexReducer,
});
