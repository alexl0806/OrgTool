import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";

import { Menu, MenuItem, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import { UserContext } from "../AppNavbar";
import { LOGOUT } from "../../../constants/actionTypes";

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

const NavbarMobileMenu = ({ isOpen, toggleMobileMenu, anchor }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useContext(UserContext);

  const logout = () => {
    dispatch({ type: LOGOUT });

    setUser(null);

    toggleMobileMenu();
  };

  return (
    <Menu
      open={isOpen}
      onClose={toggleMobileMenu}
      anchorEl={anchor}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Link to="/login" className={classes.link}>
        <MenuItem className={classes.menuItem} onClick={logout}>
          <ExitToAppOutlinedIcon />
          <Typography className={classes.menuText}>Logout</Typography>
        </MenuItem>
      </Link>
    </Menu>
  );
};

export default NavbarMobileMenu;
