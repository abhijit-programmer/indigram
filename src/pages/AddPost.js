import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  CssBaseline,
  Container,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
  LinearProgress,
} from "@material-ui/core";
import Navbar from "../components/Navbar";
import { DropzoneArea } from "material-ui-dropzone";
import { addPost } from "../services/firebase";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../components/Alert";
import { addPostInitialize } from "../redux/actions/postActions";

//custom style of components
const useStyles = makeStyles((theme) => ({
  containerStyle: {
    marginTop: theme.spacing(5),
  },
  root: {
    marginTop: theme.spacing(5),
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing(2),
    },
  },
  title: {
    fontWeight: "300",
    textAlign: "center",
    margin: theme.spacing(0, 0, 4, 0),
  },
  imageStyle: {
    minWidth: "200px",
    minHeight: "200px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "160px",
      minHeight: "160px",
    },
  },
  fileField: {
    margin: theme.spacing(2, 0),
  },
  inputField: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  submitBtn: {
    display: "block",
    textTransform: "capitalize",
    margin: "1rem auto",
  },
}));

const AddPost = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [values, setValues] = useState({
    caption: "",
    image: "",
  });

  //destructure
  const { caption, image } = values;
  const { currentUser } = useSelector((state) => state.user);
  const { loading, success, error } = useSelector((state) => state.post_state);

  //submit btn disable state change
  useEffect(() => {
    if (image !== "" && caption !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [caption, image]);

  //redirect
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(addPostInitialize());
        history.push("/dashboard");
      }, 3000);
    }
  }, [success, dispatch, history]);

  //handel input change
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  //handle form submit
  const onSubmit = (e) => {
    e.preventDefault();

    if (image[0] instanceof File && caption) {
      addPost(
        {
          file: image[0],
          caption,
          user: {
            id: currentUser.uid,
            photoURL: currentUser.photoURL,
            name: currentUser.displayName,
          },
        },
        dispatch
      );
    }
  };

  return (
    <>
      <CssBaseline />
      <Navbar />
      {/* Alert */}
      {error && <Alert message={error} severity="error" />}
      {/* Redirect */}
      {success && <Alert message="Your post added!" severity="success" />}
      <div style={{ marginTop: "49px" }}>
        <LinearProgress
          style={loading ? { opacity: "100%" } : { opacity: "0" }}
        />
      </div>
      <Container maxWidth="md" className={classes.containerStyle}>
        <Grid container spacing={2} className={classes.root} justifyContent="center">
          <Grid item xs={12} sm={6} className={classes.profileDetailsContainer}>
            <Typography variant="h5" className={classes.title} gutterBottom>
              Post your activity
            </Typography>
            <form
              className={classes.formContainer}
              noValidate
              autoComplete="off"
              onSubmit={onSubmit}
            >
              <DropzoneArea
                acceptedFiles={["image/*"]}
                filesLimit={1}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={(files) => setValues({ ...values, image: files })}
              />
              <TextField
                variant="outlined"
                className={classes.inputField}
                color="primary"
                type="text"
                size="small"
                label="Caption"
                name="caption"
                onChange={handleChange("caption")}
                value={caption}
                fullWidth
              />

              <Button
                variant="contained"
                color="primary"
                className={classes.submitBtn}
                type="submit"
                disabled={disabled}
              >
                Post
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddPost;
