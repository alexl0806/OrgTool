import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Switch, Route, Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import clsx from "clsx";

import Today from "../../Today/Today.js";
import Todo from "../../Todo/Todo.js";
import Calendar from "../../Calendar/Calendar.js";

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
    [theme.breakpoints.up("md")]: {
      marginLeft: 240,
    },
  },
}));

const listItems = [
  { path: "/user", text: "Today" },
  { path: "/user/todo", text: "To-do" },
  { path: "/user/calendar", text: "Calendar" },
  { path: "/user/labels", text: "Labels" },
  { path: "/user/flashcards", text: "Flashcards" },
];

const SideMenu = ({ isOpen, toggleSideMenu }) => {
  const classes = useStyles();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.up("md"));
  const drawerVariant = {
    variant: isSmallScreen ? "persistent" : "temporary",
  };

  return (
    <>
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
          <Route path="/user" exact>
            <Today />
          </Route>
          <Route path="/user/todo">
            <Todo />
          </Route>
          <Route path="/user/calendar">
            <Calendar />
          </Route>
          <Route path="/user/labels">
            <h1>Labels</h1>
          </Route>
          <Route path="/user/flashcards">
            <h1>Flashcards</h1>
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default SideMenu;
