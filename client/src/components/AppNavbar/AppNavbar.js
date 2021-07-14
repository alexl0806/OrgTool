import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";

import SearchBar from "./SearchBar.js";
import SideMenu from "./Menus/SideMenu.js";
import NavbarMobileMenu from "./Menus/NavbarMobileMenu";
import AddMenu from "./Menus/AddMenu.js";

import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1300,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

const AppNavbar = () => {
  const classes = useStyles();

  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

  const [addMenuIsOpen, setAddMenuIsOpen] = useState(false);
  const [addAnchorEl, setAddAnchorEl] = useState(null);

  const toggleSideMenu = () => {
    setSideMenuIsOpen(!sideMenuIsOpen);
  };

  const toggleMobileMenu = (event) => {
    setMobileMenuIsOpen(!mobileMenuIsOpen);
    setMobileAnchorEl(mobileAnchorEl === null ? event.currentTarget : null);
  };

  const toggleAddMenu = (event) => {
    setAddMenuIsOpen(!addMenuIsOpen);
    setAddAnchorEl(addAnchorEl === null ? event.currentTarget : null);
  };

  return (
    <>
      <Toolbar />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            className={classes.menuButton}
            onClick={toggleSideMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title} noWrap>
            StudyBuddy
          </Typography>
          <SearchBar />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" onClick={toggleAddMenu}>
              <AddIcon />
            </IconButton>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton color="inherit" onClick={toggleMobileMenu}>
              <MoreVertIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <NavbarMobileMenu
        isOpen={mobileMenuIsOpen}
        toggleMobileMenu={toggleMobileMenu}
        anchor={mobileAnchorEl}
      />
      <AddMenu
        isOpen={addMenuIsOpen}
        toggleAddMenu={toggleAddMenu}
        anchor={addAnchorEl}
      />
      <SideMenu isOpen={sideMenuIsOpen} toggleSideMenu={toggleSideMenu} />
    </>
  );
};

export default AppNavbar;
