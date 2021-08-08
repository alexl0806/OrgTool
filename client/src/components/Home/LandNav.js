import React from "react";
import { makeStyles } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Auth from "../Auth/Auth.js";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";

import LandPage from "./LandPage.js";
import AppNavbar from "../AppNavbar/AppNavbar.js";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  logButton: {
    fontSize: 24,
  },

  featureButton: {
    marginLeft: theme.spacing(1),
  },

  loginButton: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },

  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const LandNav = ({ isLogin }) => {
  const classes = useStyles();

  return (
    <Router>
      <Toolbar>
        <AppBar position="fixed">
          <Toolbar>
            <Link to="/home" className={classes.link}>
              <Button color="inherit" className={classes.logButton}>
                StudyBuddy
              </Button>
            </Link>

            <Link to="/features" className={classes.link}>
              <Button color="inherit" className={classes.featureButton}>
                Features
              </Button>
            </Link>

            <div className={classes.grow} />
            <Link to="/login" className={classes.link}>
              <Button
                variant="outlined"
                color="inherit"
                className={classes.loginButton}
              >
                Login
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Toolbar>

      <Switch>
        <Route path="/home">
          <LandPage />
        </Route>
        <Route path="/features">
          <h1>Features</h1>
        </Route>
        <Route path="/login">
          <Auth />
        </Route>
        <Route
          path="/user"
          render={() => (isLogin() ? <AppNavbar /> : <Redirect to="/login" />)}
        />
      </Switch>
    </Router>
  );
};

export default LandNav;
