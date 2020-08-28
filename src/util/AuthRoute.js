import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

const AuthRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (false ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

const mapStateToProps = (state) => ({
  auth: state.user.auth,
});

AuthRoute.propTypes = {
  user: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(AuthRoute);
