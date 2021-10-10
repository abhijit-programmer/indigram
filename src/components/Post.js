import {
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Button,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useSelector } from "react-redux";
import { handleLike } from "../services/firebase";
// import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
// import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: "100%",
    marginBottom: theme.spacing(4),
  },
  avatarStyle: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  cardHeaderTitle: {
    fontWeight: "500",
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
  media: {
    height: "auto",
  },
  likeBtn: {
    textTransform: "capitalize",
  },
  likeColor: {
    color: "red",
  },
}));

const Post = ({ data }) => {
  const classes = useStyles();

  //destructure
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Card className={classes.cardContainer} variant="outlined">
      <CardHeader
        avatar={
          <Avatar
            src={data.user.photoURL}
            className={classes.avatarStyle}
            alt={data.user.name}
          />
        }
        title={data.user.name}
        classes={{
          title: classes.cardHeaderTitle,
        }}
      />

      <CardMedia
        component="img"
        alt={data.user.name}
        className={classes.media}
        image={data.imageURL}
        title="Paella dish"
      />
      <CardActions>
        <Button
          className={classes.likeBtn}
          onClick={() => handleLike(currentUser.uid, data.id, data.likes)}
          startIcon={
            data.likes.includes(currentUser.uid) ? (
              <FavoriteIcon className={classes.likeColor} />
            ) : (
              <FavoriteBorderIcon />
            )
          }
        >
          {data.likes.length} Likes
        </Button>
      </CardActions>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="span">
          {data.caption}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
