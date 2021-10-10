import { useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const CustomAlert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Alert = ({ message, autoHideDuration = 3000, severity = "success" }) => {
  const [open, setOpen] = useState(true);

  //close snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <CustomAlert onClose={handleClose} severity={severity}>
        {message}
      </CustomAlert>
    </Snackbar>
  );
};

export default Alert;
