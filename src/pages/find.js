import React, { Component } from "react";
import "../componentcss/Find.css";
import axios from "axios";
import MemeItem from "../components/MemeItem";
import { LinearProgress } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notify } from "../redux/actions/userAction";

export class find extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      searchedItems: [],
      memeRowOne: [],
      memeRowTwo: [],
      loading: false,
      didUserSearch: "",
    };
  }
  searchHandler = (event) => {
    event.preventDefault();
  };
  getSearchedMemes = () => {
    this.setState({ loading: true });
    this.setState({ didUserSearch: "No Results" });
    axios
      .get("/searchMemes/" + this.state.searchTerm)
      .then((data) => {
        this.setState({ searchedItems: data.data });
        this.setState({ loading: false });
      })
      .then(() => {
        console.log(this.state.searchedItems);

        this.memeSplit();
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };
  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
    console.log(this.state.searchTerm);
  };
  memeSplit = () => {
    this.setState({
      memeRowOne: this.state.searchedItems.slice(
        0,
        this.state.searchedItems.length / 2
      ),
    });
    this.setState({
      memeRowTwo: this.state.searchedItems.slice(
        this.state.searchedItems.length / 2,
        this.state.searchedItems.length
      ),
    });
    console.log(this.state.memeRowOne);
  };

  render() {
    const findMemes = this.state.memeRowOne.map((number) => (
      <MemeItem scream={number}></MemeItem>
    ));

    const findMemes2 = this.state.memeRowTwo.map((number) => (
      <MemeItem scream={number}></MemeItem>
    ));
    return (
      <div>
        <div className="homeFindBox">
          <div className="homeFindContainerDefault">
            <div className="loadingBar">
              {this.state.loading ? (
                <LinearProgress></LinearProgress>
              ) : (
                <div></div>
              )}
            </div>
            <div className="ContainerFind">
              <form
                className="formForSearchBox"
                onSubmit={this.searchHandler}
                className="searchBar"
              >
                <input
                  className="searchInputBox"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Find A Meme"
                ></input>
                <button
                  className="searchButton"
                  onClick={this.getSearchedMemes}
                >
                  Search
                </button>
              </form>
            </div>
            <div className="findLeftContainer">
              {this.state.searchedItems.length == 0 ? (
                <div className="NoResultsOption">
                  {this.state.didUserSearch}{" "}
                </div>
              ) : (
                <div>{findMemes2}</div>
              )}
            </div>
            <div className="findRightContainer">{findMemes}</div>
          </div>
        </div>
      </div>
    );
  }
}

find.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(find);
