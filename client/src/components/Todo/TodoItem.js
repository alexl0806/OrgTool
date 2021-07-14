import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import DayJsUtils from "@date-io/dayjs";
import dayjs from "dayjs";

import { updateTodo, deleteTodo } from "../../actions/todos";

import {
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
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
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  task: {
    border: "1px solid grey",
  },
  taskInner: {
    [theme.breakpoints.up("xs")]: {
      spacing: 3,
    },
    spacing: 1,
  },
}));

const TodoItem = ({ todoData }) => {
  const classes = useStyles();

  const [editing, setEditing] = useState(false);
  const [todo, setTodo] = useState({
    title: todoData.title,
    dateDue: todoData.dateDue,
    dateCreated: todoData.dateCreated,
  });

  const dispatch = useDispatch();

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const saveTodo = () => {
    dispatch(updateTodo(todoData._id, todo));
    toggleEdit();
  };

  const deleteTodoItem = () => {
    dispatch(deleteTodo(todoData._id));
  };

  const displayEdit = (
    <MuiPickersUtilsProvider utils={DayJsUtils}>
      <Box
        width={1}
        display={editing ? "box" : "none"}
        className={classes.task}
      >
        <Grid
          container
          alignItems="center"
          wrap="nowrap"
          className={classes.taskInner}
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
              defaultValue={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
            <DateTimePicker
              format="HH:mm - MMM DD, YYYY"
              minDate={new Date()}
              minDateMessage="Due date should not be in the past"
              value={todo.dateDue}
              onChange={(e) => setTodo({ ...todo, dateDue: e })}
              label="Due Date"
            />
          </Grid>
          <Grid container item justifyContent="flex-end">
            <IconButton onClick={saveTodo}>
              <CheckCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </MuiPickersUtilsProvider>
  );

  return (
    <>
      <Box
        width={1}
        display={editing ? "none" : "box"}
        className={classes.task}
      >
        <Grid
          container
          alignItems="center"
          className={classes.taskInner}
          wrap="nowrap"
        >
          <Grid item>
            <IconButton>
              <CheckBoxOutlineBlankIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h5">{todo.title}</Typography>
            <Typography noWrap variant="subtitle1">
              {`Due Date: ${dayjs(todo.dateDue).format(
                "HH:mm on MMM DD, YYYY"
              )}`}
            </Typography>
          </Grid>
          <Grid container item justifyContent="flex-end">
            <IconButton onClick={toggleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={deleteTodoItem}>
              <DeleteForeverIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      {displayEdit}
    </>
  );
};

export default TodoItem;
