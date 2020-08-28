import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommentThread from "./CommentThread";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "#343a40",
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
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

export default function CommentBox(props) {
  const [comment, setComment] = useState("");
  const [url, setUrl] = useState("");
  var userInformation = props.props.user;
  console.log(userInformation);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleChange = (event) => {
    if (event.target.name == "url") {
      setUrl(event.target.value);
    } else {
      setComment(event.target.value);
    }
    console.log(comment);
    console.log(url);
  };

  const post = () => {
    var bearerVariable = localStorage.getItem("FBIdToken");

    axios.defaults.headers.common["Authorization"] = bearerVariable;

    console.log(bearerVariable);

    const authWithBearer = {
      body: comment,
      bodyOfPost: comment,
      url: url,
    };

    axios
      .post("/scream", authWithBearer)
      .then((data) => {
        this.props.notify("Your Post Has Been Added");
       
        window.location.reload(false);
      })
      .catch((err) => {window.location.reload(false);});
      
  };

  return (
    <div className="commentBoxContainer">
      <Card className="commentCard">
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              src={userInformation.information.imageUrl}
            >
              MR
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={userInformation.information.handle}
          subheader="Editing In Progress"
        />
        <img className="previewImage" src={url}></img>
        <CardContent>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Meme Caption</label>
            <textarea
              onChange={handleChange}
              name="comment"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </CardContent>
        <CardContent>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Meme Url</label>
            <textarea
              onChange={handleChange}
              name="url"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="1"
            ></textarea>
          </div>
        </CardContent>
        <IconButton aria-label="add to favorites">
          <Button onClick={post}>Submit</Button>
        </IconButton>
      </Card>
    </div>
  );
}
