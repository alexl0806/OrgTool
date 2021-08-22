import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { checkToken } from "../../utils/authUser.js";

import { getTodos } from "../../actions/todos";
import SearchBar from "./SearchBar.js";
import SideMenu from "./Menus/SideMenu.js";
import NavbarMobileMenu from "./Menus/NavbarMobileMenu";
import AddMenu from "./Menus/AddMenu.js";
import AccountMenu from "./Menus/AccountMenu.js";

import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export const UserContext = React.createContext();

const useStyles = makeStyles((theme) => ({
  //Makes sure the appbar is above everything else
  appBar: {
    zIndex: 1300,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  //Hides title on small screens
  title: {
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  //Only shows section on larger screens
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  //Only shows section on smaller screens
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  //Causes element to fill up empty space
  grow: {
    flexGrow: 1,
  },
}));

const AppNavbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    dispatch(getTodos(user.result._id));
  }, [dispatch]);

  useEffect(() => {
    checkToken(user, setUser, dispatch, history);
  }, [location]);

  //State of side menu
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);

  //State of mobile menu
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

  //State of add menu
  const [addMenuIsOpen, setAddMenuIsOpen] = useState(false);
  const [addAnchorEl, setAddAnchorEl] = useState(null);

  //State of account menu
  const [accountMenuIsOpen, setAccountMenuIsOpen] = useState(false);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  //Open/close side menu
  const toggleSideMenu = () => {
    setSideMenuIsOpen(!sideMenuIsOpen);
  };

  //Open/close mobile menu
  const toggleMobileMenu = (event) => {
    setMobileMenuIsOpen(!mobileMenuIsOpen);
    setMobileAnchorEl(mobileAnchorEl === null ? event.currentTarget : null);
  };

  //Open/close add menu
  const toggleAddMenu = (event) => {
    setAddMenuIsOpen(!addMenuIsOpen);
    setAddAnchorEl(addAnchorEl === null ? event.currentTarget : null);
  };

  //Open/close account menu
  const toggleAccountMenu = (event) => {
    setAccountMenuIsOpen(!accountMenuIsOpen);
    setAccountAnchorEl(accountAnchorEl === null ? event.currentTarget : null);
  };

  return (
    <UserContext.Provider value={[user, setUser]}>
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
            <IconButton color="inherit" onClick={toggleAccountMenu}>
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
      <AccountMenu
        isOpen={accountMenuIsOpen}
        toggleAccountMenu={toggleAccountMenu}
        anchor={accountAnchorEl}
      />
      <SideMenu isOpen={sideMenuIsOpen} toggleSideMenu={toggleSideMenu} />
    </UserContext.Provider>
  );
};

export default AppNavbar;
