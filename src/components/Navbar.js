import React, { Component } from "react";
import "../componentcss/Navbar.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { notify } from "../redux/actions/userAction";
import "jquery/dist/jquery.min.js";
import { connect } from "react-redux";
import "bootstrap/dist/js/bootstrap.min.js";
import LoginStatus from "./LoginStatus";
import { ToastContainer, toast } from "react-toastify";
import Link from "react-router-dom/Link";
import axios from "axios";
import {
  SET_USER,
  ADD_INFORMATION,
  REVERIFY,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
} from "../redux/types";

export class Navbar extends Component {
  componentDidMount() {
    localStorage.clear();
  }

  notify = (message) => (dispatch) => {
    if (this.props.user.auth) {
      toast(message, {
        position: "top-right",
        autoClose: 1600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  render() {
    return (
      <div className="navbarContainer">
        <ToastContainer
          position="top-right"
          autoClose={1600}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <a class="memeReviewLogo">Meme Review</a>
          </div>

          <div class="navbar-toggler">
            <LoginStatus></LoginStatus>
          </div>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item ">
                <a class="nav-link">
                  <Button component={Link} to="" color="inherit">
                    Global
                  </Button>{" "}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link">
                  <Button component={Link} to="mypage" color="inherit">
                    MyPage
                  </Button>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link">
                  <Button component={Link} to="trending" color="inherit">
                    Trending
                  </Button>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link">
                  <Button component={Link} to="find" color="inherit">
                    Search
                  </Button>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  logoutUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (el) => {
      dispatch({ type: REVERIFY, payload: el });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
