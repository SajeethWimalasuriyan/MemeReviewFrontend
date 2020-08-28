import {
    SET_USER,
    LIKEDMEMES,
    ADD_INFORMATION,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
  } from "../types";
  import axios from "axios";
  import { ToastContainer, toast } from "react-toastify";
  
  export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post("/login", userData)
      .then((res) => {
        dispatch(notify("Login Successful"));
        localStorage.setItem("FBIdToken", "Bearer " + res.data.token);
        var bearerVariable = localStorage.getItem("FBIdToken");
        console.log("SKRAAAA");
        axios.defaults.headers.common["Authorization"] = bearerVariable;
        axios.get("/details").then((data) => {
          dispatch({ type: LIKEDMEMES, payload: data.data.likes });
          console.log(data.data.likes);
        });
  
        history.push("/"); // Used to redirect to homepage
        const temporaryErrors = {
          email: "",
          handle: "",
          password: "",
          confirmPassword: "",
        };
        dispatch({ type: SET_ERRORS, payload: temporaryErrors });
        dispatch({
          type: SET_AUTHENTICATED,
          payload: "Bearer " + res.data.token,
        });
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;
        axios.get("/grabHandleWithToken").then((data) => {
          axios.get("/getUserDetail/" + data.data.handle).then((userD) => {
            dispatch({ type: ADD_INFORMATION, payload: userD });
          });
        });
      })
  
      .catch((err) => {
        dispatch({ type: SET_ERRORS });
        dispatch(notify("Email or Password is Incorrect"));
      });
  };
  
  export const notify = (message) => (dispatch) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 1600,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("FBIdToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: SET_UNAUTHENTICATED });
  };
  
  export const getUserLikedMemes = () => (dispatch) => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "FBIdToken"
    );
    axios.get("/details");
  };
  
  export const signUpUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post("/signup", newUserData)
      .then((res) => {
        localStorage.setItem("FBIdToken", "Bearer " + res.data.token);
        const temporaryErrors = {
          email: "",
          handle: "",
          password: "",
          confirmPassword: "",
        };
        dispatch({ type: SET_ERRORS, payload: temporaryErrors });
        dispatch({
          type: SET_AUTHENTICATED,
          payload: "Bearer " + res.data.token,
        });
        history.push("/"); // Used to redirect to homepage
      })
      .catch((err) => {
        if (err.response !== undefined) {
          dispatch(notify("An Error Has Occured"));
  
          dispatch({ type: SET_ERRORS, payload: err.response.data });
        } else {
          console.log("dskjgsdoikgn");
        }
      });
  };
  