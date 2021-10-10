import { useState, useEffect } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { copyToClipboard } from "../helper/utils";
import Alert from "./Alert";

//modal window position
const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

//custom style
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    boxShadow: "0 10px 20px rgba(black, 0.2)",
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down("md")]: {
      width: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  heading: {
    textAlign: "center",
  },
  text: {
    fontSize: 16,
  },
  btn: {
    margin: theme.spacing(0, 0, 0, 1),
  },
}));

const InfoModal = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [values, setValues] = useState({ success: false, error: "" });

  //destructure
  const { success, error } = values;

  //demo credentials
  const credentials = {
    email: "naruto_uzumaki@gmail.com",
    password: "naruto_uzumaki123",
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setValues((v) => ({ ...v, success: false }));
      }, 2000);
    }
  }, [success]);

  return (
    <div style={modalStyle} className={classes.paper}>
      <h2 className={classes.heading}>User Credentials</h2>
      {/* Alert */}
      {success && <Alert message="Copied!" autoHideDuration={2000} />}
      {error && (
        <Alert message={error} autoHideDuration={2000} severity="error" />
      )}
      <table>
        <tbody>
          <tr>
            <td className={classes.text}>{credentials.email}</td>
            <td>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                className={classes.btn}
                onClick={() => copyToClipboard(credentials.email, setValues)}
              >
                Copy email
              </Button>
            </td>
          </tr>

          <tr>
            <td className={classes.text}>{credentials.password}</td>
            <td>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                className={classes.btn}
                onClick={() => copyToClipboard(credentials.password, setValues)}
              >
                Copy password
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InfoModal;
