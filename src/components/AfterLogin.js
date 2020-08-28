import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom/Link";
import Moment from "react-moment";
import "../componentcss/AfterLogin.css";
import {
  SET_USER,
  ADD_INFORMATION,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
} from "../redux/types";
import { connect } from "react-redux";

export class AfterLogin extends Component {
  constructor() {
    super();
    this.state = {
      createdAt: "",
      email: "",
      handle: "Loading...",
      imageUrl: "https://i.redd.it/6eqdnsnk9vwx.gif",
      userId: "",
      bio:
        'Sorry for the longer than usual wait here is the quote of the day "Your fears, your critics, your heroes, your villains: They are fictions you perceive as reality. Choose to see through them. Choose to let them go "',
      location: "",
    };
  }
  grabContent = () => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "FBIdToken"
    );
    axios
      .get("/grabHandleWithToken")
      .then((data) => {
        console.log(data);
        var userInformationTemporary = {
          email: data.data.worked.email,
          handle: data.data.worked.handle,
          imageUrl: data.data.worked.imageUrl,
          userId: "",
          bio: data.data.worked.bio,
          location: data.data.worked.location,
        };
        this.setState(userInformationTemporary);
        console.log(userInformationTemporary);
        this.props.updateUserInfo(userInformationTemporary);
      })
      .catch(() => {
        console.log("F");
      });
  };
  componentDidMount() {
    this.grabContent();
  }
  render() {
    return (
      <div className="spaceAroundAfterLogin">
        <div className="afterLoginMainScreen">
          <form>
            <div className="userKeyInformation">
              <div class="p-2">
                <img
                  className="profilePic"
                  src={this.state.imageUrl}
                  alt="user"
                />
              </div>
              <div className="textDescriptionOfUser">
                <h6 class="font-medium">{this.state.handle}</h6>{" "}
                <span class="m-b-15 d-block">{this.state.email}</span>
                <span class="m-b-15 d-block">
                  {this.state.location ? (
                    <div>Location: {this.state.location}</div>
                  ) : (
                    <div>Location: NA</div>
                  )}
                </span>
                <span class="m-b-15 d-block">
                  <Moment fromNow>{this.state.createdAt}</Moment>
                </span>
              </div>
            </div>

            <p className="forgot-password text-right">
              Not {this.state.handle} ?
              <a onClick={this.handleLogout} href="#">
                <Button
                  onClick={this.props.logoutUser}
                  component={Link}
                  to="/login"
                  color="inherit"
                >
                  Log Out
                </Button>
              </a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (el) => {
      dispatch({ type: ADD_INFORMATION, payload: el });
    },
  };
};

export default connect(null, mapDispatchToProps)(AfterLogin);
