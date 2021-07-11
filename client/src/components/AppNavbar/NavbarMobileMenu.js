import React from "react";
import { makeStyles } from "@material-ui/core";

import { Menu, MenuItem, Typography } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    padding: theme.spacing(2),
  },
  menuText: {
    marginLeft: theme.spacing(2),
  },
}));

const NavbarMobileMenu = ({ isOpen, toggleMobileMenu, anchor }) => {
  const classes = useStyles();

  return (
    <Menu open={isOpen} onClose={toggleMobileMenu} anchorEl={anchor}>
      <MenuItem className={classes.menuItem} onClick={toggleMobileMenu}>
        <AddIcon />
        <Typography className={classes.menuText}>New</Typography>
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={toggleMobileMenu}>
        <NotificationsIcon />
        <Typography className={classes.menuText}>Notifications</Typography>
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={toggleMobileMenu}>
        <AccountCircleIcon />
        <Typography className={classes.menuText}>Account</Typography>
      </MenuItem>
    </Menu>
  );
};

export default NavbarMobileMenu;
