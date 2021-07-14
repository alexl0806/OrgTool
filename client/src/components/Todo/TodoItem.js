import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

import {
  IconButton,
  Typography,
  Grid,
  Box,
  TextField,
} from "@material-ui/core";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  test: {
    border: "1px solid grey",
  },
}));

const TodoItem = () => {
  const classes = useStyles();

  const [editing, setEditing] = useState(false);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const displayEdit = (
    <Box width={1} display={editing ? "box" : "none"} className={classes.test}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        wrap="nowrap"
        className={classes.test}
      >
        <Grid item>
          <IconButton>
            <CheckBoxOutlineBlankIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            placeholder="Task Title"
            defaultValue="Task"
          />
          <Typography variant="subtitle1">Due Date:</Typography>
        </Grid>
        <Grid container item justifyContent="flex-end">
          <IconButton onClick={toggleEdit}>
            <CheckCircleOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <>
      <Box
        width={1}
        display={editing ? "none" : "box"}
        className={classes.test}
      >
        <Grid
          container
          spacing={3}
          alignItems="center"
          className={classes.test}
          wrap="nowrap"
        >
          <Grid item>
            <IconButton>
              <CheckBoxOutlineBlankIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h5">Task</Typography>
            <Typography noWrap variant="subtitle1">
              Due Date:
            </Typography>
          </Grid>
          <Grid container item justifyContent="flex-end">
            <IconButton onClick={toggleEdit}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      {displayEdit}
    </>
  );
};

export default TodoItem;
