import React from "react";
import { makeStyles } from "@material-ui/core";

import { Menu, MenuItem, Typography } from "@material-ui/core";

import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    padding: theme.spacing(2),
  },
  menuText: {
    marginLeft: theme.spacing(2),
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
      <MenuItem className={classes.menuItem} onClick={toggleAddMenu}>
        <FormatListBulletedIcon />
        <Typography className={classes.menuText}>New Task</Typography>
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={toggleAddMenu}>
        <NoteOutlinedIcon />
        <Typography className={classes.menuText}>New Flashcard</Typography>
      </MenuItem>
    </Menu>
  );
};

export default AddMenu;
