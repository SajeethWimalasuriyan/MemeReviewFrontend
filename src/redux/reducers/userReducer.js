import {
    SET_USER,
    LIKEDMEMES,
    ADD_INFORMATION,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    REVERIFY,
  } from "../types";
  
  const initialState = {
    auth: false,
    credentials: {},
    information: {
      createdAt: "",
      email: "",
      handle: "Loading...",
      imageUrl: "https://i.redd.it/6eqdnsnk9vwx.gif",
      userId: "",
      bio:
        'Sorry for the longer than usual wait here is the quote of the day "Your fears, your critics, your heroes, your villains: They are fictions you perceive as reality. Choose to see through them. Choose to let them go "',
      location: "",
    },
    likes: [],
    likedMemes: [],
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case LIKEDMEMES:
        return {
          ...state,
          likedMemes: action.payload,
        };
      case SET_AUTHENTICATED:
        console.log("workedauthhh");
        return {
          ...state,
          auth: true,
          credentials: action.payload,
        };
      case SET_UNAUTHENTICATED:
        return initialState;
      case SET_USER:
        return {
          auth: true,
          ...action.payload,
        };
      case ADD_INFORMATION:
        if (action.payload.email == undefined) {
          return state;
        } else {
          return {
            ...state,
            information: action.payload,
          };
        }
      case REVERIFY:
        return {
          auth: true,
          information: action.payload.data.worked,
        };
  
      default:
        return state;
    }
  }
  