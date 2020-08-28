import React, { Component } from "react";
import "../componentcss/TrendingMemeItem.css";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdbreact";
import Moment from "react-moment";
import { Button } from "@material-ui/core";
import axios from "axios";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import AddCommentOutlinedIcon from "@material-ui/icons/AddCommentOutlined";

import CommentThread from "./CommentThread";

//Todo add relative time to meme post date.

export class TrendingMemeItem extends Component {
  constructor(props) {
    super();

    this.state = {
      postId: props.scream.screamId,
      userComment: "",
      memeCommentThread: [],
      showCommentBox: false,
    };
  }

  render() {
    let commentsPresentToRender = this.state.showCommentBox ? (
      <div>
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
      </div>
    ) : (
      <div></div>
    );

    const {
      classes,
      scream: {
        body,
        url,
        commentCount,
        bodyOfPost,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
      },
    } = this.props;
    return (
      <div className="trendingMemeContainer">
        <MDBRow>
          <MDBCol md="14">
            <MDBCard className="trendingBackgroundCard" cascade>
              <MDBCardImage cascade className="img-fluid" hover src={url} />
              <MDBBtn
                floating
                tag="a"
                className="ml-auto mr-4 lighten-3 mdb-coalor"
                action
              >
                <MDBIcon icon="chevron-right" className="mdb-color lighten-3" />
              </MDBBtn>
              <MDBCardBody cascade>
                <MDBCardTitle>{body}</MDBCardTitle>
                <hr />
                <MDBCardText>{bodyOfPost}</MDBCardText>
              </MDBCardBody>

              {commentsPresentToRender}

              {this.state.memeCommentThread.map((data) => (
                <CommentThread commentInformation={data}></CommentThread>
              ))}
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default TrendingMemeItem;
