import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Collapse, makeStyles } from "@material-ui/core";
import DayJsUtils from "@date-io/dayjs";
import dayjs from "dayjs";

import { updateTodo, deleteTodo, createTodo } from "../../actions/todos";
import PrioMenu from "./PrioMenu";

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
  Tooltip,
  Checkbox,
  InputLabel,
  Chip,
} from "@material-ui/core";
import {
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
} from "@material-ui/lab";

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
    [theme.breakpoints.up("md")]: {
      direction: "row",
      flexWrap: "nowrap",
    },
    direction: "column",
    flexWrap: "wrap",
  },
  buttonText: {
    marginLeft: 3,
    flexWrap: "nowrap",
  },
  mobileEditIcons: {
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-end",
    },
    justifyContent: "center",
  },
  mobileDatePicker: {
    [theme.breakpoints.up("md")]: {
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

  //State of to-do item (edit mode)
  const [editing, setEditing] = useState(isNew);

  //To-do data
  const [todo, setTodo] = useState(todoData);

  //To-do data in edit mode before being saved
  const [editTodo, setEditTodo] = useState(todo);

  /*
  Should the to-do data be modified from outside the component,
  update the to-do item accordingly. Needed to update the default
  due date/time for the new to-do item whenever the add task button
  is pressed
  */
  useEffect(() => {
    setTodo(todoData);
    setEditTodo(todoData);
  }, [todoData]);

  //State of prio menu
  const [prioMenuIsOpen, setPrioMenuIsOpen] = useState(false);
  const [prioAnchorEl, setPrioAnchorEl] = useState(null);

  //State of new tag in process of creation
  const [newTag, setNewTag] = useState("");

  const dispatch = useDispatch();

  //Opens to-do item edit mode
  const handleEditOpen = () => {
    setEditing(true);
  };

  //Closes to-do item edit mode
  const handleEditClose = () => {
    setEditing(false);
  };

  //Cancels changes made in edit mode
  const handleEditCancel = () => {
    setEditTodo(todo);

    if (isNew) {
      setNew(false);
    } else {
      handleEditClose();
    }
  };

  //Saves changes made in edit mode
  const handleEditSave = () => {
    if (isNew) {
      setNew(false);
      dispatch(createTodo(editTodo));
      setEditTodo(todo);
    } else {
      console.log(editTodo.checked);
      dispatch(updateTodo(todoData._id, editTodo));
      setTodo(editTodo);
      handleEditClose();
    }
  };

  //Open/close add menu
  const togglePrioMenu = (event) => {
    setPrioMenuIsOpen(!prioMenuIsOpen);
    setPrioAnchorEl(prioAnchorEl === null ? event.currentTarget : null);
  };

  //Deletes to-do item
  const deleteTodoItem = () => {
    dispatch(deleteTodo(todoData._id));
  };

  //Returns correct color depending on selected priority level
  const prioColor = () => {
    switch (editTodo.priority) {
      case 0:
        return "#cc3232";
      case 1:
        return "#db7b2b";
      case 2:
        return "#e7b416";
      case 3:
        return "#2dc937";
      default:
        return "#d3d3d3";
    }
  };

  //Checks/Unchecks checkbox
  const handleCheck = () => {
    setEditTodo({ ...editTodo, checked: !editTodo.checked });
  };

  /*
  Updates to-do item after item has been checked/unchecked.
  Necessary to ensure that to-do item is updated
  after the state has finished changing. Otherwise,
  user will have to click on checkbox twice before
  it is registered.
  */
  useEffect(() => {
    if (!isNew) {
      dispatch(updateTodo(todoData._id, editTodo));
      setTodo(editTodo);
    }
  }, [editTodo.checked]);

  const tagOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
  ];

  const tagButton = (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <TextField
        style={{ flexGrow: 1, marginRight: 1 + "rem" }}
        placeholder="Create New Tag"
        onChange={(e) => setNewTag(e.target.value)}
      ></TextField>
      <Button
        variant="outlined"
        color="primary"
        style={{ whiteSpace: "nowrap" }}
        onMouseDown={() => {
          console.log(newTag);
        }}
      >
        Add Tag
      </Button>
    </Box>
  );

  //To-do item edit mode
  const displayEdit = (
    <MuiPickersUtilsProvider utils={DayJsUtils}>
      <Box
        width={1}
        display={editing ? "box" : "none"}
        className={classes.task}
      >
        <Grid container direction="column">
          <Collapse
            in={editing}
            collapsedSize={80}
            style={{ width: "inherit" }}
          >
            <Grid
              container
              item
              alignItems="center"
              className={classes.taskInner}
              direction="row"
              spacing={2}
            >
              <Grid item md={3} xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Task Title"
                  value={editTodo.title}
                  onChange={(e) =>
                    setEditTodo({ ...editTodo, title: e.target.value })
                  }
                  inputProps={{ maxLength: 20 }}
                />
              </Grid>
              <Grid item md={9} xs={12}>
                <Autocomplete
                  multiple
                  debug={true}
                  fullWidth
                  options={tagOptions}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  noOptionsText={tagButton}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Tags"
                      placeholder="Select Tags"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      />
                    ))
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
              spacing={3}
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
                  style={{
                    padding: "1rem",
                    position: "relative",
                    marginTop: "1rem",
                  }}
                >
                  <ToggleButton value="None">
                    <Typography>None</Typography>
                  </ToggleButton>
                  {/*
                  The InputLabel is placed in the middle of all the ToggleButtons
                  because the ToggleButtons have special styles applied to the
                  first and last child of the ToggleButtonGroup. By placing
                  the label in the middle, these styles are not disrupted.
                  */}
                  <InputLabel shrink style={{ position: "absolute", top: 0 }}>
                    Repeating
                  </InputLabel>
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
                <Tooltip title="tags" placement="top">
                  <IconButton>
                    <LabelIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="priority" placement="top">
                  <IconButton onClick={togglePrioMenu}>
                    <FlagIcon style={{ color: prioColor() }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid
              container
              item
              className={classes.mobileEditIcons}
              wrap="nowrap"
            >
              <Grid item>
                <Button
                  onClick={handleEditSave}
                  variant="contained"
                  color="primary"
                  style={{ marginRight: 10 }}
                >
                  <CheckCircleOutlineIcon />
                  <Typography className={classes.buttonText}>
                    {isNew ? "Add Task" : "Save Task"}
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleEditCancel}
                  variant="contained"
                  color="secondary"
                >
                  <CancelOutlinedIcon />
                  <Typography className={classes.buttonText}>Cancel</Typography>
                </Button>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Box>
      <PrioMenu
        isOpen={prioMenuIsOpen}
        togglePrioMenu={togglePrioMenu}
        anchor={prioAnchorEl}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
      />
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
            <Grid container item justifyContent="center" xs={1}>
              <Grid item>
                <Checkbox checked={todo.checked} onClick={handleCheck} />
              </Grid>
              <Grid item>
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    onClick={handleEditOpen}
                    className={classes.mobileIconsDisplay}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Delete" placement="top">
                  <IconButton
                    onClick={deleteTodoItem}
                    className={classes.mobileIconsDisplay}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              className={classes.taskInner}
              style={{ flexWrap: "nowrap" }}
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
                <Tooltip title="Edit" placement="top">
                  <IconButton onClick={handleEditOpen}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="top">
                  <IconButton onClick={deleteTodoItem}>
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
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
