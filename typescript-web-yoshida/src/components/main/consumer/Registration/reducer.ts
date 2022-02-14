import { initialstate } from '../common/utility/initalState';
import { LOGIN, LOGOUT } from '../Login/action';
import { SET_USER_INFO } from './action';

export function registrationReducer(state = initialstate.loginUser, action: { type: string; payload: {} }) {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload, login: true };
    case LOGOUT:
      return {
        ...state,
        ...action.payload,
      };
    case SET_USER_INFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
