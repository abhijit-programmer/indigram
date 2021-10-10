import {
  CssBaseline,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import Suggestion from "../components/Suggestion";
import { collection, onSnapshot, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";

//custom style of components
const useStyles = makeStyles((theme) => ({
  containerStyle: {
    marginTop: theme.spacing(10),
  },
  root: {
    height: "auto",
    marginTop: theme.spacing(2),
  },
  postContainer: {
    height: "100%",
  },
  suggetionContainer: {
    paddingLeft: theme.spacing(4),
    position: "sticky",
    top: "80px",
    height: "91vh",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  text: {
    fontSize: 14,
  },
  footerText: {
    marginTop: theme.spacing(5),
    fontWeight: "500",
    fontSize: 11,
    textTransform: "uppercase",
  },
  footerTextLink: {
    color: "inherit",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({});

  //destructure
  const { currentUser } = useSelector((state) => state.user);

  //load all posts
  useEffect(() => {
    const userQuery = query(
      collection(db, "users"),
      where("custom_id", "==", currentUser.uid),
    );
    const postQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unSubUser = onSnapshot(userQuery, (snapshot) => {
      setUserData(snapshot.docs.map((doc) => doc.data())[0]);
    });

    const unSubPosts = onSnapshot(postQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(data);
    });

    return () => {
      unSubUser();
      unSubPosts();
    };
  }, [currentUser]);


  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="md" className={classes.containerStyle}>
        <Grid container className={classes.root}>
          <Grid item md={8} sm={12} xs={12} className={classes.postContainer}>
            {posts &&
              userData &&
              posts.map((post) => {
                if (
                  userData.following.includes(post.user.id) ||
                  post.user.id === userData.custom_id
                ) {
                  return <Post key={post.id} data={post} />;
                } else {
                  return <></>;
                }
              })}
          </Grid>
          <Grid item md={4} className={classes.suggetionContainer}>
            <Typography
              className={classes.text}
              variant="h6"
              color="textSecondary"
              component="h6"
            >
              Suggestions For You
            </Typography>
            <Suggestion />

            <Typography
              className={classes.footerText}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              © 2021 Indigram made by{" "}
              <a
                className={classes.footerTextLink}
                href="https://linktr.ee/webdevabhijit"
                target="_blank"
                rel="noreferrer"
              >
                Abhijit
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
