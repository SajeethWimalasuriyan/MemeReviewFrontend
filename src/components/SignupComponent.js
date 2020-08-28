import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import { connect } from "react-redux";
import { signUpUser, logoutUser } from "../redux/actions/userAction";
import "../componentcss/LoginSignup.css";
import Moment from "react-moment";

import Button from "@material-ui/core/Button";
import Link from "react-router-dom/Link";
import AfterLogin from "./AfterLogin";

export class SignupComponent extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
      bio: "",
      location: "",
      showtab: false,
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  };
  handleSubmit = (event) => {
    event.preventDefault(); //prevents reload
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signUpUser(newUserData, this.props.history);
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  handleSubmitUpdate = (event) => {
    event.preventDefault();
    if (this.state.showtab) {
      //prevents reload

      const updateBio = {
        bio: this.state.bio,
        location: this.state.location,
      };

      var bearerVariable = localStorage.getItem("FBIdToken");

      axios.defaults.headers.common["Authorization"] = bearerVariable;

      axios
        .post("/userDetail/" + this.handle, updateBio)
        .then((data) => {
          this.setState({ showtab: !this.state.showtab });
        })
        .catch(() => {
          console.log("error");
        });
    } else {
      this.setState({ showtab: !this.state.showtab });
    }
  };
  componentDidRecieveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
  }

  render() {
    const {
      classes,
      ui: { loading, errors },
      user: { auth },
    } = this.props;

    return !auth ? (
      <div>
        <div className="spaceAroundLoginHome">
          <form>
            <h3 className="prompt">Sign Up</h3>
            <div className="form-group">
              <label>Handle</label>
              <input
                name="handle"
                onChange={this.handleChange}
                type="text"
                className="form-control"
                placeholder="First name"
              />
              <small id="passwordHelp" class="text-danger">
                {errors.handle}
              </small>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                name="email"
                onChange={this.handleChange}
                type="text"
                className="form-control"
                placeholder="Last name"
              />
              <small id="passwordHelp" class="text-danger">
                {errors.email}
              </small>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                onChange={this.handleChange}
                type="password"
                className="form-control"
                placeholder="Enter email"
              />
              <small id="passwordHelp" class="text-danger">
                {errors.password}
              </small>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                onChange={this.handleChange}
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
              <small id="passwordHelp" class="text-danger">
                {errors.confirmPassword}
              </small>
            </div>

            <button
              onClick={this.handleSubmit}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered{" "}
              <a href="#">
                <Button component={Link} to="/login" color="inherit">
                  sign in?
                </Button>
              </a>
            </p>
          </form>
        </div>
      </div>
    ) : (
      <AfterLogin></AfterLogin>
    );
  }
}

SignupComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  logoutUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});
const mapActionsToProps = {
  signUpUser,
  logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(SignupComponent);
