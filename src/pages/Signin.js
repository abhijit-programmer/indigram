import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Typography,
  makeStyles,
  Grid,
  Card,
  Button,
  TextField,
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  loginInitiate,
  googleSignInitiate,
} from "../redux/actions/authActions";
import Alert from "../components/Alert";
import InfoModal from "../components/InfoModal";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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
  submitBtnStyle: {
    marginTop: theme.spacing(3),
    textTransform: "capitalize",
  },
  facebookLoginBtn: {
    marginTop: theme.spacing(3),
    textTransform: "none",
    color: "#385185",
  },
  loadDemo: {
    margin: theme.spacing(0, 0, 1, 0),
    textTransform: "none",
    color: "#385185",
  },
  googleIcon: {
    margin: theme.spacing(0, 1, 0, 0),
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

const Signin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  //destructure
  const { currentUser, error } = useSelector((state) => state.user);
  const { email, password } = values;

  //submit btn disable state change
  useEffect(() => {
    if (email !== "" && password !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  //trigger when signin
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

    if (!email && !password) return;

    dispatch(loginInitiate(email, password));
    setValues({ ...values, email: "", password: "" });
  };

  //handle google login
  const handleGoogleLogIn = () => {
    dispatch(googleSignInitiate());
  };

  //modal open
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  //modal close
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
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
                label="Email"
                variant="outlined"
                color="primary"
                size="small"
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
                className={classes.textFieldStyle}
                inputProps={{ style: { fontSize: 13, padding: "15px 14px" } }}
                InputLabelProps={{ style: { fontSize: 13 } }}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.submitBtnStyle}
                fullWidth
                type="submit"
                disabled={disabled}
              >
                Log in
              </Button>
              <div className={classes.orContainer}>
                <div className={classes.line}></div>
                <Typography variant="body2" className={classes.text}>
                  or
                </Typography>

                <div className={classes.line}></div>
              </div>
              <Button
                className={classes.facebookLoginBtn}
                onClick={handleGoogleLogIn}
              >
                <i className={`fab fa-google ${classes.googleIcon}`}></i>Log in
                with Google
              </Button>

              <Button
                className={classes.loadDemo}
                startIcon={<AccountCircleIcon />}
                onClick={handleModalOpen}
              >
                Get test credentials
              </Button>

              <Link className={classes.forgotPassword} to="/forgot-password">
                Forgot password?
              </Link>
            </form>
          </Card>

          <Card className={classes.bottomCardContainer} variant="outlined">
            <Typography variant="body2" className={classes.bottomCardText}>
              Don't have an account?{" "}
              <Link className={classes.bottomCardLinkText} to="/signup">
                Sign up
              </Link>
            </Typography>
          </Card>
        </Grid>
      </Grid>
      {/* Modal Window */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <InfoModal />
        </Fade>
      </Modal>
    </>
  );
};

export default Signin;
