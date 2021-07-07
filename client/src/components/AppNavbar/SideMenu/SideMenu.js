import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
}));

const listItems = ["First Item", "Second Item", "Third Item"];

const SideMenu = ({ isOpen, toggleSideMenu }) => {
  const classes = useStyles();

  return (
    <>
      <Drawer
        anchor="left"
        open={isOpen}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={toggleSideMenu}
      >
        <div>
          <Toolbar />
          <List>
            {listItems.map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default SideMenu;
