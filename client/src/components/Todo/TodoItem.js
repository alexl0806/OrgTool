import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Collapse, makeStyles } from "@material-ui/core";
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
  Divider,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import LabelIcon from "@material-ui/icons/Label";
import FlagIcon from "@material-ui/icons/Flag";

const useStyles = makeStyles((theme) => ({
  task: {
    border: "1px solid grey",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2),
    },
    padding: theme.spacing(1),
  },
  taskInner: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      direction: "row",
      flexWrap: "nowrap",
    },
    direction: "column",
    flexWrap: "wrap",
  },
  formButton: {
    textTransform: "none",
    marginRight: theme.spacing(1),
    border: "1px solid grey",
    borderRadius: 0,
  },
  buttonText: {
    marginLeft: theme.spacing(1),
  },
  mobileEditIcons: {
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-end",
    },
    justifyContent: "center",
  },
  mobileDatePicker: {
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-start",
    },
    justifyContent: "center",
  },
  mobileIconsDisplay: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    display: "flex",
  },
  desktopIconsDisplay: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    display: "none",
  },
}));

const TodoItem = ({ todoData, isNew, setNew }) => {
  const classes = useStyles();

  const [editing, setEditing] = useState(isNew);
  const [todo, setTodo] = useState({
    title: todoData.title,
    dateDue: todoData.dateDue,
    repeatOption: todoData.repeatOption,
    dateCreated: todoData.dateCreated,
  });
  const [editTodo, setEditTodo] = useState(todo);
  useEffect(() => {
    setTodo({
      title: todoData.title,
      dateDue: todoData.dateDue,
      repeatOption: todoData.repeatOption,
      dateCreated: todoData.dateCreated,
    });
    setEditTodo({
      title: todoData.title,
      dateDue: todoData.dateDue,
      repeatOption: todoData.repeatOption,
      dateCreated: todoData.dateCreated,
    });
  }, [todoData]);

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
      dispatch(updateTodo(todoData._id, editTodo));
      setTodo(editTodo);
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
          <Collapse in={editing} collapsedSize={80}>
            <Grid
              container
              item
              alignItems="center"
              className={classes.taskInner}
            >
              <Grid item>
                <TextField
                  variant="outlined"
                  placeholder="Task Title"
                  value={editTodo.title}
                  onChange={(e) =>
                    setEditTodo({ ...editTodo, title: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              item
              className={classes.taskInner}
              alignItems="center"
            >
              <Grid container item className={classes.mobileDatePicker}>
                <DateTimePicker
                  variant="inline"
                  format="HH:mm - MMM DD, YYYY"
                  value={editTodo.dateDue}
                  onChange={(e) => setEditTodo({ ...editTodo, dateDue: e })}
                  label="Due Date"
                />
              </Grid>
              <Grid container item justifyContent="center">
                <ToggleButtonGroup
                  value={editTodo.repeatOption}
                  exclusive
                  onChange={(e, newRepeat) =>
                    setEditTodo({ ...editTodo, repeatOption: newRepeat })
                  }
                  size="small"
                  style={{ padding: "1rem" }}
                >
                  <ToggleButton value="None">
                    <Typography>None</Typography>
                  </ToggleButton>
                  <ToggleButton value="Daily">
                    <Typography>Daily</Typography>
                  </ToggleButton>
                  <ToggleButton value="Weekly">
                    <Typography>Weekly</Typography>
                  </ToggleButton>
                  <ToggleButton value="Monthly">
                    <Typography>Monthly</Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid container item className={classes.mobileEditIcons}>
                <IconButton>
                  <LabelIcon />
                </IconButton>
                <IconButton>
                  <FlagIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container item className={classes.mobileEditIcons}>
              <Grid item>
                <Button className={classes.formButton} onClick={handleEditSave}>
                  <CheckCircleOutlineIcon />
                  <Typography className={classes.buttonText}>
                    {isNew ? "Add Task" : "Save Task"}
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.formButton}
                  onClick={handleEditCancel}
                >
                  <CancelOutlinedIcon />
                  <Typography className={classes.buttonText}>Cancel</Typography>
                </Button>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Box>
    </MuiPickersUtilsProvider>
  );

  return (
    <>
      <Box
        width={1}
        className={classes.task}
        style={editing ? { display: "none" } : { display: "flex" }}
      >
        <Grid container direction="column" alignItems="center" wrap="nowrap">
          <Grid
            container
            item
            alignItems="center"
            direction="row"
            wrap="nowrap"
          >
            <Grid item>
              <IconButton>
                <CheckBoxOutlineBlankIcon />
              </IconButton>
              <IconButton
                onClick={handleEditOpen}
                className={classes.mobileIconsDisplay}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={deleteTodoItem}
                className={classes.mobileIconsDisplay}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              className={classes.taskInner}
            >
              <Grid item>
                <Typography variant="h5">{todo.title}</Typography>
                <Typography noWrap variant="subtitle1">
                  {`Due Date: ${dayjs(todo.dateDue).format(
                    "HH:mm on MMM DD, YYYY"
                  )}`}
                </Typography>
              </Grid>
              <Grid
                container
                item
                justifyContent="flex-end"
                className={classes.desktopIconsDisplay}
              >
                <IconButton onClick={handleEditOpen}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={deleteTodoItem}>
                  <DeleteForeverIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Collapse in={editing}>
              <div style={{ height: 120 }} />
            </Collapse>
          </Grid>
        </Grid>
      </Box>
      {displayEdit}
    </>
  );
};

export default TodoItem;
