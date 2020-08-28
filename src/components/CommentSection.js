import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import "../componentcss/commentSection.css";
import CommentThread from "./CommentThread";
import { connect } from "react-redux";
import { notify } from "../redux/actions/userAction";

export class CommentSection extends Component {
  constructor(props) {
    super();

    this.state = {
      postId: props.postId,
      userComment: "",
      memeCommentThread: [],
      showCommentBox: false,
      value: 5,
    };
  }
  handleChange = (event) => {
    console.log(this.state.postId);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  likeMeme = () => {
    var bearerVariable = localStorage.getItem("FBIdToken");

    axios.defaults.headers.common["Authorization"] = bearerVariable;

    axios
      .get("/screamlike/" + this.state.postId)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.body);
      });
  };
  submitComment = () => {
    console.log(this.props.user.auth);
    if (this.props.user.auth === false) {
      this.props.notify("Login To Comment");
    } else if (this.state.userComment == "") {
      this.props.notify("Comment Empty");
    } else {
      console.log("worked");
      var bearerVariable = localStorage.getItem("FBIdToken");

      axios.defaults.headers.common["Authorization"] = bearerVariable;

      const authWithBearer = {
        body: this.state.userComment,
        rating: this.state.value,
      };

      axios
        .post("/screamcomment/" + this.state.postId, authWithBearer)

        .then((data) => {
          console.log(this.state.postId);
          this.grabMemeCommentSection();
        })
        .then((after) => {
          console.log("ObamaPrism");
          this.likeMeme();
        })
        .catch((err) => {
          console.log(this.props);
        });
    }
  };

  likeMeme = () => {
    console.log("worked");
    var bearerVariable = localStorage.getItem("FBIdToken");

    axios.defaults.headers.common["Authorization"] = bearerVariable;

    axios
      .get("/screamlike/" + this.state.postId)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.body);
      });
  };

  grabMemeCommentSection = () => {
    this.setState({ showCommentBox: true });
    axios
      .get("/screamdetails/" + this.state.postId)
      .then((data) => {
        this.setState({ memeCommentThread: data.data.comments });
      })

      .catch((err) => {
        console.log(err.body);
      });
  };
  handleChangeForRating = (event) => {
    this.setState({ value: event.target.getAttribute("name") });
  };

  render() {
    return (
      <div>
        <label for="exampleFormControlTextarea4">Rating</label>
        <div class="s">
          <label className="eyyyyy">{this.state.value}</label>
          <label
            className="eyyyyy"
            name="1"
            onClick={this.handleChangeForRating}
          >
            ★
          </label>
          <label
            className="eyyyyy"
            name="2"
            onClick={this.handleChangeForRating}
          >
            ★
          </label>
          <label
            className="eyyyyy"
            name="3"
            onClick={this.handleChangeForRating}
          >
            ★
          </label>
          <label
            className="eyyyyy"
            name="4"
            onClick={this.handleChangeForRating}
          >
            ★
          </label>
          <label
            className="eyyyyy"
            name="5"
            onClick={this.handleChangeForRating}
          >
            ★
          </label>
        </div>
        <div class="form-group purple-border">
          <label for="exampleFormControlTextarea4">Comment</label>
          <textarea
            name="userComment"
            onChange={this.handleChange}
            class="form-control"
            id="exampleFormControlTextarea4"
            rows="2"
          ></textarea>
        </div>
        <Button onClick={this.submitComment}>Submit</Button>
        <Button onClick={this.grabMemeCommentSection}>Comments</Button>

        <div className="commentBox">
          {this.state.memeCommentThread.map((data) => (
            <CommentThread commentInformation={data}></CommentThread>
          ))}
        </div>
      </div>
    );
  }
}

CommentSection.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(CommentSection);
