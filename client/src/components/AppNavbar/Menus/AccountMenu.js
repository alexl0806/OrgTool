import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";

import { Menu, MenuItem, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import { UserContext } from "../AppNavbar";
import { LOGOUT } from "../../../constants/actionTypes";

import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    padding: theme.spacing(2),
  },
  menuText: {
    marginLeft: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const AccountMenu = ({ isOpen, toggleAccountMenu, anchor }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useContext(UserContext);

  const logout = () => {
    dispatch({ type: LOGOUT });

    setUser(null);

    toggleAccountMenu();
  };

  return (
    <Menu
      open={isOpen}
      onClose={toggleAccountMenu}
      anchorEl={anchor}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Link to="/user" className={classes.link}>
        <MenuItem className={classes.menuItem} onClick={toggleAccountMenu}>
          <SentimentSatisfiedOutlinedIcon />
          <Typography className={classes.menuText}>Account</Typography>
        </MenuItem>
      </Link>
      <Link to="/login" className={classes.link}>
        <MenuItem className={classes.menuItem} onClick={logout}>
          <ExitToAppOutlinedIcon />
          <Typography className={classes.menuText}>Logout</Typography>
        </MenuItem>
      </Link>
    </Menu>
  );
};

export default AccountMenu;
