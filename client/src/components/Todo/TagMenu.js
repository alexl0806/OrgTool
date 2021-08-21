import React from "react";
import { makeStyles } from "@material-ui/core";

import { Select, MenuItem, Checkbox, ListItemText } from "@material-ui/core";

import FilterListIcon from "@material-ui/icons/FilterList";

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

const TagMenu = ({ sortTags, setSortTags, tags }) => {
  const classes = useStyles();

  return (
    <Select
      multiple
      displayEmpty
      variant="outlined"
      value={sortTags}
      onChange={(e) => setSortTags(e.target.value)}
      className={classes.sortEl}
      classes={{
        root: classes.sortRoot,
        select: classes.select,
        icon: classes.icon,
        iconOpen: classes.iconOpen,
        outlined: classes.outlined,
      }}
      IconComponent={FilterListIcon}
      renderValue={(selected) => {
        if (selected.length === 0) {
          return <>Tags</>;
        }

        return selected.join(", ");
      }}
    >
      <MenuItem disabled value="">
        <em>Sort by tags</em>
      </MenuItem>

      {tags.map((tag) => (
        <MenuItem key={tag} value={tag}>
          <Checkbox checked={sortTags.indexOf(tag) > -1} />
          <ListItemText primary={tag} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default TagMenu;
