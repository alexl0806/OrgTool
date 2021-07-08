import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@material-ui/core";

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

  return (
    <Router>
      <Drawer
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
            <Link to={path} className={classes.link}>
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <Switch>
        <Route path="/" exact>
          <h1>Today</h1>
        </Route>
        <Route path="/todo">
          <h1>Todo</h1>
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
    </Router>
  );
};

export default SideMenu;
