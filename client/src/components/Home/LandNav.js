import React from "react";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Auth from "../Auth/Auth.js";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";

import LandPage from "./LandPage.js";

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

const LandNav = () => {
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

      <div>
        <Switch>
          <Route path="/" exact>
            <LandPage />
          </Route>
          <Route path="/features">
            <h1>Features</h1>
          </Route>
          <Route path="/auth">
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default LandNav;
