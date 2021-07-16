import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import DayJsUtils from "@date-io/dayjs";
import dayjs from "dayjs";

import { updateTodo, deleteTodo, createTodo } from "../../actions/todos";

import {
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  IconButton,
  Button,
  Typography,
  Grid,
  Box,
  TextField,
} from "@material-ui/core";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  task: {
    border: "1px solid grey",
    padding: theme.spacing(2),
  },
  taskInner: {
    [theme.breakpoints.up("xs")]: {
      spacing: 3,
    },
    spacing: 1,
  },
  formButton: {
    textTransform: "none",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    border: "1px solid grey",
    borderRadius: 0,
  },
  buttonText: {
    marginLeft: theme.spacing(1),
  },
}));

const TodoItem = ({ todoData, isNew, setNew }) => {
  const classes = useStyles();

  const [editing, setEditing] = useState(isNew);
  const [todo, setTodo] = useState({
    title: todoData.title,
    dateDue: todoData.dateDue,
    dateCreated: todoData.dateCreated,
  });
  const [editTodo, setEditTodo] = useState(todo);

  const dispatch = useDispatch();

  const handleEditOpen = () => {
    setEditing(true);
  };

  const handleEditClose = () => {
    setEditing(false);
  };

  const handleEditCancel = () => {
    setEditTodo(todo);

    if (isNew) {
      setNew(false);
    } else {
      handleEditClose();
    }
  };

  const handleEditSave = () => {
    if (isNew) {
      setNew(false);
      dispatch(createTodo(editTodo));
      setEditTodo(todo);
    } else {
      setTodo(editTodo);
      dispatch(updateTodo(todoData._id, todo));
      handleEditClose();
    }
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
        <Grid container direction="column">
          <Grid
            container
            item
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
                value={editTodo.title}
                onChange={(e) =>
                  setEditTodo({ ...editTodo, title: e.target.value })
                }
              />
              <DateTimePicker
                format="HH:mm - MMM DD, YYYY"
                value={editTodo.dateDue}
                onChange={(e) => setEditTodo({ ...editTodo, dateDue: e })}
                label="Due Date"
              />
            </Grid>
          </Grid>
          <Grid container item>
            <Button className={classes.formButton} onClick={handleEditSave}>
              <CheckCircleOutlineIcon />
              <Typography className={classes.buttonText}>
                {isNew ? "Add Task" : "Save Task"}
              </Typography>
            </Button>
            <Button className={classes.formButton} onClick={handleEditCancel}>
              <CancelOutlinedIcon />
              <Typography className={classes.buttonText}>Cancel</Typography>
            </Button>
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
            <IconButton onClick={handleEditOpen}>
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
