import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import clsx from "clsx";

import Today from "../Today.js";
import Todo from "../Todo.js";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    padding: theme.spacing(3),
  },
  contentShift: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: 240,
    },
  },
}));

const listItems = [
  { path: "/", text: "Today" },
  { path: "/todo", text: "To-do" },
  { path: "/calendar", text: "Calendar" },
  { path: "/labels", text: "Labels" },
  { path: "/flashcards", text: "Flashcards" },
];

const SideMenu = ({ isOpen, toggleSideMenu }) => {
  const classes = useStyles();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const drawerVariant = {
    variant: isSmallScreen ? "persistent" : "temporary",
  };

  return (
    <Router>
      <Drawer
        {...drawerVariant}
        anchor="left"
        open={isOpen}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={toggleSideMenu}
      >
        <Toolbar />
        <List>
          {listItems.map(({ path, text }) => (
            <Link to={path} className={classes.link} key={text}>
              <ListItem button>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <div
        className={clsx(classes.content, { [classes.contentShift]: isOpen })}
      >
        <Switch>
          <Route path="/" exact>
            <Today />
          </Route>
          <Route path="/todo">
            <Todo />
          </Route>
          <Route path="/calendar">
            <h1>Calendar</h1>
          </Route>
          <Route path="/labels">
            <h1>Labels</h1>
          </Route>
          <Route path="/flashcards">
            <h1>Flashcards</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default SideMenu;
