import {
  CssBaseline,
  Container,
  Grid,
  makeStyles,
  Typography,
  Avatar,
  Button,
  Chip,
  Box,
} from "@material-ui/core";
import Navbar from "../components/Navbar";
import ProfilePostGallery from "../components/ProfilePostGallery";
import { logoutInitiate } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";

//custom style of components
const useStyles = makeStyles((theme) => ({
  containerStyle: {
    marginTop: theme.spacing(10),
  },
  root: {
    marginTop: theme.spacing(5),
    borderBottom: "1px solid #dbdbdb",
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing(2),
    },
  },
  userName: {
    fontWeight: "300",
    textTransform: "capitalize",
  },
  avatarStyle: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  },
  logoutBtn: {
    textTransform: "capitalize",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(1, 0),
    },
  },
  chipContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    margin: theme.spacing(2, 0),
    "& > *": {
      marginRight: theme.spacing(0.5),
    },
  },
  profileImageContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  profileDetailsContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);

  //destructure
  const { currentUser } = useSelector((state) => state.user);

  //handle user logout
  const handleLogout = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };

  //get user data
  useEffect(() => {
    const userQuery = query(
      collection(db, "users"),
      where("custom_id", "==", currentUser.uid)
    );

    const postQuery = query(
      collection(db, "posts"),
      where("user.id", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
    );

    const unSubUser = onSnapshot(userQuery, (snapshot) => {
      setUserData(snapshot.docs.map((doc) => doc.data())[0]);
    });

    const unSubPosts = onSnapshot(postQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(data);
    });

    //cleanup
    return () => {
      unSubUser();
      unSubPosts();
    };
  }, [currentUser]);

  return (
    <>
      <CssBaseline />
      <Navbar />
      {console.log()}
      <Container maxWidth="md" className={classes.containerStyle}>
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} sm={4} className={classes.profileImageContainer}>
            <Avatar
              src={currentUser.photoURL}
              className={classes.avatarStyle}
              alt="Profile Picture"
            />
          </Grid>
          <Grid item xs={12} sm={8} className={classes.profileDetailsContainer}>
            <Typography variant="h5" className={classes.userName} gutterBottom>
              {currentUser.displayName}
            </Typography>
            {userData?.followers && (
              <Box className={classes.chipContainer}>
                <Chip label={`${posts?.length} posts`} variant="outlined" />
                <Chip
                  label={`${userData.followers.length} followers`}
                  variant="outlined"
                />
                <Chip
                  label={`${userData.following.length} following`}
                  variant="outlined"
                />
              </Box>
            )}

            <Button
              variant="outlined"
              className={classes.logoutBtn}
              size="small"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
        <ProfilePostGallery data={posts} />
      </Container>
    </>
  );
};

export default Profile;
