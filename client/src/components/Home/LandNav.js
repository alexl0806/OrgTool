import React from "react";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  logButton: {
    fontSize: 24,
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
    <Toolbar>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/home" className={classes.link}>
            <Button color="inherit" className={classes.logButton}>
              StudyBuddy
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
  );
};

export default LandNav;
