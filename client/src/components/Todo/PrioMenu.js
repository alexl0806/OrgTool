import React from "react";
import { makeStyles } from "@material-ui/core";

import { Menu, MenuItem, Typography } from "@material-ui/core";

import FlagIcon from "@material-ui/icons/Flag";
import createPalette from "@material-ui/core/styles/createPalette";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    padding: theme.spacing(2),
  },
  menuText: {
    marginLeft: theme.spacing(2),
  },
}));

const PrioMenu = ({
  isOpen,
  togglePrioMenu,
  anchor,
  editTodo,
  setEditTodo,
}) => {
  const classes = useStyles();

  return (
    <Menu
      open={isOpen}
      onClose={togglePrioMenu}
      anchorEl={anchor}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MenuItem
        className={classes.menuItem}
        onClick={() => setEditTodo({ ...editTodo, priority: 1 })}
      >
        <FlagIcon style={{ color: "#cc3232" }} />
        <Typography className={classes.menuText}>Very High</Typography>
      </MenuItem>
      <MenuItem
        className={classes.menuItem}
        onClick={() => setEditTodo({ ...editTodo, priority: 2 })}
      >
        <FlagIcon style={{ color: "#db7b2b" }} />
        <Typography className={classes.menuText}>High</Typography>
      </MenuItem>
      <MenuItem
        className={classes.menuItem}
        onClick={() => setEditTodo({ ...editTodo, priority: 3 })}
      >
        <FlagIcon style={{ color: "#e7b416" }} />
        <Typography className={classes.menuText}>Medium</Typography>
      </MenuItem>
      <MenuItem
        className={classes.menuItem}
        onClick={() => setEditTodo({ ...editTodo, priority: 4 })}
      >
        <FlagIcon style={{ color: "#2dc937" }} />
        <Typography className={classes.menuText}>Low</Typography>
      </MenuItem>
    </Menu>
  );
};

export default PrioMenu;
