import React, { Component } from "react";
import axios from "axios";
import MemeItem from "../components/MemeItem";
import { SignupComponent } from "../components/SignupComponent";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../componentcss/trending.css";
import TrendingMemeItem from "../components/TrendingMemeItem";
import { LinearProgress } from "@material-ui/core";

export class trending extends Component {
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
    this.setState({ loading: true });
    delete axios.defaults.headers.common["Authorization"];
    let url = "https://api.imgflip.com/get_memes";
    axios
      .get(url)
      .then((data) => {
        var tempMemeList = [];

        data.data.data.memes.forEach((element) => {
          tempMemeList.push({
            body: element.name,
            url: element.url,
            createdAt: new Date(),
            userImage: "zzz",
            userHandle: "zzz",
            screamId: "zzz",
            likeCount: "zzz",
          });
          console.log(tempMemeList[0]);
        });
        this.setState({ memes: tempMemeList });
        this.memeSplit();
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
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
  };

  render() {
    let progressBar = this.state.loading ? (
      <LinearProgress></LinearProgress>
    ) : (
      <div></div>
    );
    const trendingMemes = this.state.memeRowOne.map((number) => (
      <TrendingMemeItem scream={number}></TrendingMemeItem>
    ));

    const trendingMemes2 = this.state.memeRowTwo.map((number) => (
      <TrendingMemeItem scream={number}></TrendingMemeItem>
    ));
    return (
      <div className="homeContainerTrending">
        <div className="loadingBar">{progressBar}</div>
        <div className="leftContainerTrending">{trendingMemes}</div>
        <div className="rightContainerTrending">{trendingMemes2}</div>
      </div>
    );
  }
}

trending.propTypes = {
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
export default connect(mapStateToProps, mapActionsToProps)(trending);
