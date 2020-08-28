import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "../componentcss/MemeItem.css";
import Moment from "react-moment";
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
import CommentSection from "./CommentSection";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import StarIcon from "@material-ui/icons/Star";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { ToastContainer, toast } from "react-toastify";

var postIdGlobal = 0;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1345,
    backgroundColor: "#343a40",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    color: "white",
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function MemeItem(scream) {
  console.log(scream);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const memeId = scream.scream.screamId;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const runToast = (handle) => {
    console.log(handle);
    toast.info(handle, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const follow = () => {
    console.log(scream.scream.rating);
    var bearerVariable = localStorage.getItem("FBIdToken");

    axios.defaults.headers.common["Authorization"] = bearerVariable;

    axios
      .post("/follow/" + scream.scream.userHandle)
      .then((data) => {
        console.log(data);

        runToast('Followed User Successfully');
      })
      .catch((err) => {
        console.log(err.body);
      });
  };

  return (
    <div className="memeContainer">
      <Card className={classes.root}>
        <CardHeader
          className="memeCardMUI"
          avatar={
            <Avatar aria-label="recipe" src={scream.scream.userImage}>
              MR
            </Avatar>
          }
          action={
            <IconButton
              className="memeCardMUI"
              onClick={follow}
              aria-label="settings"
            >
              <PersonAddIcon />
            </IconButton>
          }
          title={scream.scream.userHandle}
          subheader={
            <Moment className="memeCardMUI" fromNow>
              {scream.scream.createdAt}
            </Moment>
          }
        />
        <MDBCardImage
          cascade
          className="img-fluid"
          overlay="white-light"
          hover
          src={scream.scream.url}
        />
        <CardContent>
          <Typography
            className="memeCardMUI"
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {scream.scream.body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton className="memeCardMUI" aria-label="add to favorites">
            {scream.scream.rating}

            <StarIcon />
          </IconButton>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CommentSection postId={scream.scream.screamId}></CommentSection>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
