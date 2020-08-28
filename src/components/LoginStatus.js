import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom/Link";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../componentcss/LoginStatus.css";
import { SignupComponent } from "./SignupComponent";
import { logoutUser } from "../redux/actions/userAction";
import { AfterLogin } from "./AfterLogin";
import Moment from "react-moment";
import axios from "axios";
import MemeItem from "./MemeItem";

export class LoginStatus extends Component {
  constructor(props) {
    super();
    this.state = {
      bb: "",
      seeMore: false,
      showtab: false,
      bio: "",
      location: "",
    };
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  };

  handleSubmitUpdate = (event) => {
    event.preventDefault();
    if (this.state.showtab) {
      //prevents reload

      const updateBio = {
        bio: this.state.bio,
        location: this.state.location,
      };

      var bearerVariable = localStorage.getItem("FBIdToken");

      axios.defaults.headers.common["Authorization"] = bearerVariable;

      axios
        .post("/userDetail/" + this.handle, updateBio)
        .then((data) => {
          this.setState({ showtab: !this.state.showtab });
        })
        .catch(() => {
          console.log("error");
        });
    } else {
      this.setState({ showtab: !this.state.showtab });
    }
  };
  see = () => {
    this.setState({ seeMore: !this.state.seeMore });
  };

  render() {
    console.log(this.props.user.information);
    let likedMemes = this.props.user.auth ? (
      this.props.user.likedMemes.map((scream) => (
        <MemeItem scream={scream.screamData}></MemeItem>
      ))
    ) : (
      <div>
        <h6> No memes liked yet :(</h6>
      </div>
    );
    const {
      classes,
      user: { auth, information },
    } = this.props;
    console.log(information.imageUrl);
    console.log(this.props);

    const updateBioInputs = this.state.showtab ? (
      <div className="spaceAroundMainPages">
        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            onChange={this.handleChange}
            class="form-control"
            id="exampleFormControlTextarea4"
            rows="3"
          ></textarea>{" "}
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            name="location"
            onChange={this.handleChange}
            type="text"
            className="form-control"
            placeholder="Location"
          />
        </div>
      </div>
    ) : (
      <div class="bioText">{information.bio}</div>
    );

    let showDetails = this.state.seeMore ? (
      <div className="loginStatusUserStatusContainerMobile">
        <div className="loginStatusUserStatusMobile">
          <div>
            <div className="spaceAroundLoginMobile">
              <form>
                <div className="userKeyInformation">
                  <div class="p-2">
                    <img
                      className="profilePic"
                      src={information.imageUrl}
                      alt="user"
                    />
                  </div>
                  <div className="textDescriptionOfUser">
                    <h6 class="fontSizeForMobileCard">
                      {information.handle.slice(0, 25)}
                    </h6>{" "}
                    <span class="fontSizeForMobileCard">
                      {information.email.slice(0, 25)}
                    </span>
                    <span class="fontSizeForMobileCard">
                      {information.location ? (
                        <div> {information.location.slice(0, 25)}</div>
                      ) : (
                        <div>Location: NA</div>
                      )}
                    </span>
                    <span class="fontSizeForMobileCard">
                      <Moment fromNow>{information.createdAt}</Moment>
                    </span>
                  </div>
                </div>

                <p className="forgot-password text-right">
                  Not {this.props.user.information.handle} ?
                  <a onClick={this.handleLogout} href="#">
                    <Button
                      onClick={this.props.logoutUser}
                      component={Link}
                      to="/login"
                      color="inherit"
                    >
                      Log Out
                    </Button>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="likedMemeLoginStatus">
          <h5> Liked Memes </h5>
          {likedMemes}
        </div>
      </div>
    ) : (
      <div></div>
    );

    let postBox = auth ? (
      <div class="btn-group">
        <img
          onClick={this.see}
          className="loginStatusImage"
          src={information.imageUrl}
          alt="avatar image"
        />
        {showDetails}
      </div>
    ) : (
      <Button component={Link} to="/signup" color="inherit">
        <div className="loginStatusContainer">Sign Up</div>
      </Button>
    );
    return <div>{postBox}</div>;
  }
}

LoginStatus.propTypes = {
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
  logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(LoginStatus);
