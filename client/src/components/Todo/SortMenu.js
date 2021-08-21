import React from "react";
import { makeStyles } from "@material-ui/core";

import { Select, MenuItem } from "@material-ui/core";

import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";

const useStyles = makeStyles((theme) => ({
  sortRoot: {
    height: "20px",
    padding: theme.spacing(1),
    textAlign: "center",
  },
  select: {
    borderRadius: 20,
    "&:focus": {
      borderRadius: 20,
    },
    paddingLeft: 40,
  },
  icon: {
    left: 15,
  },
  iconOpen: {
    transform: "none",
  },
  outlined: {
    "&:select": {
      paddingRight: 0,
    },
  },
  sortEl: {
    borderRadius: 20,
    marginRight: theme.spacing(1),
    maxWidth: 200,
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
      maxWidth: "100%",
      marginBottom: "10px",
    },
  },
}));

const SortMenu = ({ sortVar, setSortVar }) => {
  const classes = useStyles();

  return (
    <Select
      variant="outlined"
      value={sortVar}
      onChange={(e) => setSortVar(e.target.value)}
      className={classes.sortEl}
      classes={{
        root: classes.sortRoot,
        select: classes.select,
        icon: classes.icon,
        iconOpen: classes.iconOpen,
        outlined: classes.outlined,
      }}
      IconComponent={SortByAlphaIcon}
    >
      <MenuItem value="name">Name</MenuItem>
      <MenuItem value="priority">Priority</MenuItem>
      <MenuItem value="dateDue">Date Due</MenuItem>
    </Select>
  );
};

export default SortMenu;
