import React, { Component } from "react";
import Moment from "react-moment";

export class CommentThread extends Component {
  constructor(props) {
    super();
  }
  render() {
    const {
      commentInformation: { body, userHandle, createdAt, userImage },
    } = this.props;

    return (
      <div class="d-flex flex-row comment-row m-t-0">
        <div class="p-2">
          <img src={userImage} alt="user" width="50" class="rounded-circle" />
        </div>
        <div class="comment-text w-100">
          <h6 class="font-medium">{userHandle}</h6>{" "}
          <span class="m-b-15 d-block">{body} </span>
          <div class="comment-footer">
            {" "}
            <span class="text-muted float-right">
              <Moment fromNow>{createdAt}</Moment>
            </span>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default CommentThread;
