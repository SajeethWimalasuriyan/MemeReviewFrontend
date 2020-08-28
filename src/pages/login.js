import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userAction";
import "../componentcss/LoginSignupExternal.css";
import { ToastContainer, toast } from "react-toastify";

export class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentDidRecieveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  };
  handleSubmit = (event) => {
    console.log(this.props.user);
    event.preventDefault(); //prevents reload

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
  };
  render() {
    const {
      classes,
      ui: { loading },
    } = this.props;

    let loadingBar = loading ? <LinearProgress /> : <div></div>;
    return (
      <div className="entireLoginScreen">
        <div className="filler"></div>
        <div className="spaceAroundLoginExternal">
          {loadingBar}
          <form>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                name="email"
                onChange={this.handleChange}
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                onChange={this.handleChange}
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button
              onClick={this.handleSubmit}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Submit
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
};
const mapsStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});
const mapActionsToProps = {
  loginUser,
};

export default connect(mapsStateToProps, mapActionsToProps)(login);
