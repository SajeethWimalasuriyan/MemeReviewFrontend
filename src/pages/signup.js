import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import { connect } from "react-redux";
import { signUpUser } from "../redux/actions/userAction";
import "../componentcss/LoginSignupExternal.css";
import { ToastContainer, toast } from "react-toastify";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom/Link";

export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
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

  componentDidRecieveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
  }

  render() {
    const {
      classes,
      ui: { loading, errors },
    } = this.props;
    let loadingBar = loading ? <LinearProgress /> : <div></div>;
    return (
      <div className="entireLoginScreen">
        <div className="filler"></div>
        <div className="spaceAroundLoginExternal">
          {loadingBar}
          <form>
            <h3>Sign Up</h3>

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
    );
  }
}

signup.propTypes = {
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
};

export default connect(mapStateToProps, mapActionsToProps)(signup);
