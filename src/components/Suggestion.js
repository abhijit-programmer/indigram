import {
  makeStyles,
  Card,
  CardHeader,
  Avatar,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  doc,
  arrayUnion,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  avatarStyle: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  cardHeaderTitle: {
    fontWeight: "500",
  },
  cardHeaderAction: {
    fontWeight: "500",
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1),
    textTransform: "capitalize",
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
  media: {
    height: "auto",
  },
}));

const Suggestion = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  //destructure
  const { currentUser } = useSelector((state) => state.user);

  //load users
  useEffect(() => {
    const q = query(collection(db, "users"), where("custom_id", "!=", currentUser.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, [currentUser]);

  //handle follow btn
  const handleFollow = async (followId, currentUserId) => {
    const followUserRef = doc(db, "users", followId);
    const currentUserRef = doc(db, "users", currentUserId);

    //update follow user
    updateDoc(followUserRef, {
      followers: arrayUnion(currentUserId),
    })
      .then((data) => {
        console.log("Updated!!!");
      })
      .catch((e) => console.log(e));

    //update current user
    updateDoc(currentUserRef, {
      following: arrayUnion(followId),
    })
      .then((data) => {
        console.log("Updated!!!");
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      
      {users
        .filter((user) => !user.followers.includes(currentUser.uid))
        .map((user, index) => (
          <Card
            className={classes.cardContainer}
            variant="outlined"
            key={user.custom_id}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={user.photoURL}
                  className={classes.avatarStyle}
                  alt="Profile Picture"
                />
              }
              action={
                <Button
                  size="small"
                  className={classes.cardHeaderAction}
                  onClick={() => handleFollow(user.custom_id, currentUser.uid)}
                >
                  Follow
                </Button>
              }
              title={user.name}
              classes={{
                title: classes.cardHeaderTitle,
              }}
            />
          </Card>
        ))}
    </>
  );
};

export default Suggestion;
