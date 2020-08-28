import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import MemeItem from "../components/MemeItem";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userAction";
import PropTypes from "prop-types";
import plus from "../plus.png";
import CommentBox from "../components/CommentBox";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom/Link";
import signup from "./signup";
import SignupComponent from "../components/SignupComponent";
import { ToastContainer, toast } from "react-toastify";
import "../componentcss/home.css";
import { LinearProgress } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { notify } from "../redux/actions/userAction";
import {
  SET_USER,
  ADD_INFORMATION,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
} from "../redux/types";

export class home extends Component {
  constructor() {
    super();
    this.state = {
      screams: null,
      likedMemes: [],
      textForSubmit: "",
      imageForSubmit: "",
      showComment: false,
      bodyOfPost: "",
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/screams")
      .then((res) => {
        console.log(res);
        this.setState({
          screams: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }
  componentDidUpdate() {
    if (this.props.user.auth && this.state.logged == 0) {
      this.props.notify("You Are Now Logged In");

      this.setState({ logged: 1 });
    }
  }

  handleChange = (event) => {
    console.log(this.state.screams);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleInputComment = () => {
    this.setState({ showComment: !this.state.showComment });
  };
  post = () => {
    var bearerVariable = localStorage.getItem("FBIdToken");

    axios.defaults.headers.common["Authorization"] = bearerVariable;

    console.log(bearerVariable);

    const authWithBearer = {
      body: this.state.textForSubmit,
      bodyOfPost: this.state.bodyOfPost,
      url: this.state.imageForSubmit,
    };

    axios
      .post("/scream", authWithBearer)
      .then((data) => {
        this.notify("Your Post Has Been Added");
      })
      .catch((err) => {
        this.props.history.push("/login");
      });
  };
  render() {
    let postButton = this.props.user.auth ? (
      <img
        onClick={this.handleInputComment}
        className="postButton"
        src={plus}
      ></img>
    ) : (
      <div></div>
    );
    let postBox = this.state.showComment ? (
      <CommentBox props={this.props}></CommentBox>
    ) : (
      <div></div>
    );

    let recentMemesMarkup = this.state.screams ? (
      this.state.screams.map((scream) => <MemeItem scream={scream}></MemeItem>)
    ) : (
      <div></div>
    );

    let likedMemes =
      this.props.user.likedMemes.length != 0 ? (
        <div>
          {this.props.user.likedMemes.map((scream) => (
            <MemeItem scream={scream.screamData}></MemeItem>
          ))}
        </div>
      ) : (
        <div>
          <h6> No memes liked yet :(</h6>
        </div>
      );

    let memeDisp = this.props.user.auth ? (
      <div>
        <h5>Liked Memes:</h5>
        {likedMemes}
      </div>
    ) : (
      <div></div>
    );

    let progressBar = this.state.loading ? (
      <LinearProgress></LinearProgress>
    ) : (
      <div></div>
    );
    return this.state.showComment ? (
      <div>
        {postButton}

        <CommentBox props={this.props}></CommentBox>
      </div>
    ) : (
      <div>
        {postButton}

        <div className="homeBox">
          <div className="homeContainerDefault">
            <div className="functionBar">{progressBar}</div>
            <div className="leftContainer">{recentMemesMarkup}</div>
            <div className="rightContainer">
              <SignupComponent></SignupComponent>
              <div className="likedMemes">{memeDisp}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

home.propTypes = {
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
  notify,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
