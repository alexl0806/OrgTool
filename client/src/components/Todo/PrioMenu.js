import React from "react";
import { makeStyles } from "@material-ui/core";

import { Menu, MenuItem, Typography } from "@material-ui/core";

import FlagIcon from "@material-ui/icons/Flag";

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

  const prioOptions = [
    ["Very High", "#cc3232"],
    ["High", "#db7b2b"],
    ["Medium", "#e7b416"],
    ["Low", "#2dc937"],
  ];

  const handlePrioChange = (prio) => {
    setEditTodo({ ...editTodo, priority: prio });
    togglePrioMenu();
  };

  return (
    <Menu
      open={isOpen}
      onClose={togglePrioMenu}
      anchorEl={anchor}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      {prioOptions.map((option, index) => (
        <MenuItem
          className={classes.menuItem}
          onClick={() => handlePrioChange(index)}
          selected={index === editTodo.priority}
          key={index}
        >
          <FlagIcon style={{ color: option[1] }} />
          <Typography className={classes.menuText}>{option[0]}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default PrioMenu;
