import React from "react";
import { makeStyles } from "@material-ui/core";

import { Menu, MenuItem, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

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

const AddMenu = ({ isOpen, toggleAddMenu, anchor }) => {
  const classes = useStyles();

  return (
    <Menu
      open={isOpen}
      onClose={toggleAddMenu}
      anchorEl={anchor}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Link to="/user/todo" className={classes.link}>
        <MenuItem className={classes.menuItem} onClick={toggleAddMenu}>
          <FormatListBulletedIcon />
          <Typography className={classes.menuText}>New Task</Typography>
        </MenuItem>
      </Link>
    </Menu>
  );
};

export default AddMenu;
