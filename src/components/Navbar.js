import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Avatar,
  Container,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFF",
    boxShadow: "none",
    borderBottom: "1px solid #dbdbdb",
  },
  navbarContainer: {
    padding: "0",
  },
  toolbarStyle: {},
  title: {
    flexGrow: 1,
    fontFamily: "'Playball', cursive",
    fontSize: 25,
  },
  avatarStyle: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
}));

const Navbar = () => {
  const classes = useStyles();

  //destructure
  const { currentUser } = useSelector((state) => state.user);

  return (
    <AppBar position="fixed" className={classes.root}>
      <Container maxWidth="md" className={classes.navbarContainer}>
        <Toolbar variant="dense" className={classes.toolbarStyle}>
          <Typography variant="h6" className={classes.title}>
            <Link to="/dashboard" className={classes.link}>
              Indigram
            </Link>
          </Typography>
          <div>
            <Tooltip title="Add Post" aria-label="add-post">
              <Link to="/add-post">
                <IconButton>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Link>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Go to profile" aria-label="profile">
              <Link to="/profile">
                <IconButton>
                  <Avatar
                    src={currentUser.photoURL}
                    className={classes.avatarStyle}
                    alt="Profile Picture"
                  />
                </IconButton>
              </Link>
            </Tooltip>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
