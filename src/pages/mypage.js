import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import "../componentcss/MyPage.css";
import MemeItem from "../components/MemeItem";
import { Redirect } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";

export class mypage extends Component {
  constructor() {
    super();
    this.state = {
      memes: [],
      memeRowOne: [],
      memeRowTwo: [],
      loading: false,
    };
  }

  componentDidMount() {
    if (this.props.user.auth == false) {
      this.props.history.push("/login");
    }
    var bearerVariable = localStorage.getItem("FBIdToken");
    this.setState({ loading: true });
    console.log("worked");
    axios.defaults.headers.common["Authorization"] = bearerVariable;
    axios
      .get("/getFollowersMemes")
      .then((data) => {
        this.setState({ memes: data.data });
        this.memeSplit();
        console.log(data.data);
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  memeSplit = () => {
    this.setState({
      memeRowOne: this.state.memes.slice(0, this.state.memes.length / 2),
    });
    this.setState({
      memeRowTwo: this.state.memes.slice(
        this.state.memes.length / 2,
        this.state.memes.length
      ),
    });
    console.log(this.state.memeRowOne);
    console.log(this.state.memeRowTwo);
  };

  render() {
    const trendingMemes = this.state.memeRowOne.map((number) => (
      <MemeItem scream={number}></MemeItem>
    ));

    const trendingMemes2 = this.state.memeRowTwo.map((number) => (
      <MemeItem scream={number}></MemeItem>
    ));
    let progressBar = this.state.loading ? (
      <LinearProgress></LinearProgress>
    ) : (
      <div></div>
    );
    return (
      <div>
        <div className="homeContainerMypage">
          <div className="loadingBar">{progressBar}</div>
          <div className="leftContainerMypage">{trendingMemes2}</div>
          <div className="rightContainerMypage">{trendingMemes}</div>
        </div>
      </div>
    );
  }
}

mypage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  logoutUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});
const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(mypage);
