import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Typography,
  makeStyles,
  Grid,
  Card,
  Button,
  TextField,
} from "@material-ui/core";
import { registerInitiate } from "../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../components/Alert";
import { DropzoneArea } from "material-ui-dropzone";

//custom style of components
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#fafafa",
  },
  cardContainer: {
    width: 350,
    margin: "auto",
    paddingBottom: theme.spacing(4),
  },
  brandLogo: {
    fontFamily: "'Playball', cursive",
    fontSize: 40,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  bottomCardContainer: {
    width: 350,
    marginTop: 15,
    margin: "auto",
  },
  bottomCardText: {
    padding: theme.spacing(3),
    textAlign: "center",
  },
  bottomCardLinkText: {
    fontWeight: "500",
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
  formContainer: {
    display: "flex",
    width: "80%",
    margin: "auto",
    flexDirection: "column",
    marginTop: theme.spacing(5),
  },
  textFieldStyle: {
    marginTop: theme.spacing(2),
  },
  passwordFieldStyle: {
    margin: theme.spacing(2, 0, 2, 0),
  },
  submitBtnStyle: {
    marginTop: theme.spacing(3),
    textTransform: "none",
  },
  facebookLoginBtn: {
    marginTop: theme.spacing(3),
    textTransform: "none",
    color: "#385185",
  },
  orContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(3),
  },
  line: {
    flexGrow: "1",
    flexShrink: "1",
    backgroundColor: "#dbdbdb",
    height: "1px",
    position: "relative",
    top: ".45em",
  },
  text: {
    color: "#8e8e8e",
    flexGrow: "0",
    flexShrink: "0",
    fontSize: "13px",
    fontWeight: "600",
    lineHeight: "15px",
    margin: "0 18px",
    textTransform: "uppercase",
  },
  forgotPassword: {
    color: "#00376b",
    fontFamily: "'Roboto'",
    textDecoration: "none",
    fontSize: 13,
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
}));

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: ""
  });

  //destructure
  const { currentUser, error } = useSelector((state) => state.user);
  const { name, email, password, photoURL } = values;

  //submit btn disable state change
  useEffect(() => {
    if (name !== "" && email !== "" && password !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, password]);

  //trigger when signup
  useEffect(() => {
    if (currentUser) {
      history.push("/dashboard");
    }
  }, [currentUser, history]);

  //handel input change
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name && !email && !password) return;

    dispatch(registerInitiate(email, password, name, photoURL[0]));
    setValues({ ...values, name: "", email: "", password: "" });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      {/* Alert */}
      {error && <Alert message={error} severity="error" />}
      <Grid item md={6}>
        <Card className={classes.cardContainer} variant="outlined">
          <Typography variant="h1" className={classes.brandLogo}>
            Indigram
          </Typography>
          <form
            className={classes.formContainer}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Name"
              variant="outlined"
              color="primary"
              size="small"
              value={name}
              onChange={handleChange("name")}
              className={classes.textFieldStyle}
              inputProps={{ style: { fontSize: 13, padding: "15px 14px" } }}
              InputLabelProps={{ style: { fontSize: 13 } }}
            />
            <TextField
              label="Email"
              variant="outlined"
              color="primary"
              size="small"
              value={email}
              onChange={handleChange("email")}
              className={classes.textFieldStyle}
              inputProps={{ style: { fontSize: 13, padding: "15px 14px" } }}
              InputLabelProps={{ style: { fontSize: 13 } }}
            />
            <TextField
              label="Password"
              variant="outlined"
              color="primary"
              size="small"
              type="password"
              onChange={handleChange("password")}
              value={password}
              className={classes.passwordFieldStyle}
              inputProps={{ style: { fontSize: 13, padding: "15px 14px" } }}
              InputLabelProps={{ style: { fontSize: 13 } }}
            />
            <DropzoneArea
              acceptedFiles={["image/*"]}
              filesLimit={1}
              className={classes.uploadFileArea}
              dropzoneText={"Upload Profile Photo"}
              onChange={(files) => setValues({ ...values, photoURL: files })}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.submitBtnStyle}
              fullWidth
              disabled={disabled}
              type="submit"
            >
              Sign up
            </Button>
          </form>
        </Card>

        <Card className={classes.bottomCardContainer} variant="outlined">
          <Typography variant="body2" className={classes.bottomCardText}>
            Have an account?{" "}
            <Link className={classes.bottomCardLinkText} to="/">
              Log In
            </Link>
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
