
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/action-types';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user 
? { isLggedIn: true, user}
: {isLggedIn: false, user: null};


// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action){
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS: 
      return {...state, isLggedIn: false };
    
    case REGISTER_FAIL:
      return {...state, isLggedIn: false };

    case LOGIN_SUCCESS:
      return { ...state, isLggedIn: true, user: payload.user};

    case LOGIN_FAIL:
      return { ...state, isLggedIn: false, user:null};
    
    case LOGOUT:
      return { ...state, isLggedIn: false, user: null}
    
    default:
      return state;
  }
}