import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  makeStyles,
  Grid,
  Card,
  Button,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordInitiate } from "../redux/actions/authActions";
import Alert from "../components/Alert";

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
    textTransform: "none",
  },
  goBackBtn: {
    marginTop: theme.spacing(1),
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

const ForgotPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [values, setValues] = useState({
    email: "",
  });

  //destructure
  const { email } = values;
  const { error, success } = useSelector(state => state.user);

  //submit btn disable state change
  useEffect(() => {
    if (email !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email]);

  //handel input change
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const sendPasswordResetEmail = (e) => {
    e.preventDefault();
    setValues({ ...values });
    dispatch(forgotPasswordInitiate(email));
    return;
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
      {success && <Alert message="Check your email!" severity="success" />}
      <Grid item md={6}>
        <Card className={classes.cardContainer} variant="outlined">
          <Typography variant="h1" className={classes.brandLogo}>
            Indigram
          </Typography>
          <form
            className={classes.formContainer}
            noValidate
            autoComplete="off"
            onSubmit={sendPasswordResetEmail}
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

            <Button
              variant="contained"
              color="primary"
              className={classes.submitBtnStyle}
              fullWidth
              disabled={disabled}
              type="submit"
            >
              Send Email
            </Button>

            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.goBackBtn}
                fullWidth
              >
                Go back
              </Button>
            </Link>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
