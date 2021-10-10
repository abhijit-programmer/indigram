import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  LinearProgress,
  CssBaseline,
} from "@material-ui/core";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions/authActions";
import PrivateRoute from "./auth/PrivateRoute";
import AddPost from "./pages/AddPost";

//material ui theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0d6efd",
    },
    secondary: {
      main: "#6c757d",
    },
  },
});

const Routes = () => {
  const dispatch = useDispatch();

  //destructure
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LinearProgress
        style={loading ? { opacity: "100%" } : { opacity: "0" }}
      />
      <Router>
        <Switch>
          <Route path="/" exact component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/add-post" component={AddPost} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default Routes;
