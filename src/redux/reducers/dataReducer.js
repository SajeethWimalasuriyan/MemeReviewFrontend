import {
    SET_USER,
    REVERIFY,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_AUTHENTICATED,
  } from "../types";
  
  const initialState = {
    auth: false,
    credentials: {},
    likes: [],
    notifications: [],
  };
  
  export default function (state = initialState, action) {
    console.log(action);
    switch (action.type) {
      case SET_AUTHENTICATED:
        return {
          ...state,
          auth: true,
          credentials: action.payload,
        };
      case SET_AUTHENTICATED:
        return initialState;
      case REVERIFY:
        return {
          auth: true,
        };
  
      default:
        return state;
    }
  }
  