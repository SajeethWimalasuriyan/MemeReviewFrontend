import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from "./pages/home";
import find from "./pages/find";
import login from "./pages/login";
import signup from "./pages/signup";
import Navbar from "./components/Navbar";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
import trending from "./pages/trending";
import mypage from "./pages/mypage";

import axios from "axios";

let auth;

axios.defaults.baseURL =
  "https://us-central1-react-social-2b464.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodeToken = jwtDecode(token);
  if (decodeToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    auth = false;
  } else {
    auth = true;
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div>
          <Router>
            <Navbar></Navbar>
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                exact
                path="/login"
                component={login}
                authenticated={auth}
              />
              <AuthRoute exact path="/trending" component={trending} />
              <AuthRoute
                exact
                path="/find"
                component={find}
                authenticated={auth}
              />
              <AuthRoute
                exact
                path="/mypage"
                component={mypage}
                authenticated={false}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                authenticated={auth}
              />
            </Switch>
          </Router>
        </div>
      </div>
    </Provider>
  );
}

export default App;
