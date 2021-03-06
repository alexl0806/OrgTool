import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Collapse, makeStyles } from "@material-ui/core";
import DayJsUtils from "@date-io/dayjs";
import dayjs from "dayjs";
import { checkToken } from "../../../utils/authUser.js";

import { updateTodo, deleteTodo, createTodo } from "../../../actions/todos";
import { updateUser } from "../../../actions/user";
import { resetToken } from "../../../actions/auth";
import PrioMenu from "./PrioMenu";
import { UserContext } from "../../AppNavbar/AppNavbar.js";

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
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  task: {
    border: "2px solid #bdbdbd",
  },
  taskInner: {
    [theme.breakpoints.up("md")]: {
      direction: "row",
      flexWrap: "nowrap",
    },
    direction: "column",
    flexWrap: "wrap",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
    padding: theme.spacing(2),
  },
  divider: {
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(0, 3, 0, 3),
    },
    margin: theme.spacing(0, 2, 0, 2),
  },
  saveButton: {
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(0, 3, 3, 0),
    },
    margin: theme.spacing(0, 2, 2, 2),
  },
  buttonText: {
    padding: 3,
    flexWrap: "nowrap",
  },
  mobileEditIcons: {
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-end",
    },
    justifyContent: "center",
    flexWrap: "wrap",
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
  toggleButtonMargin: {
    padding: "1rem",
    position: "relative",
    overflow: "auto",
    [theme.breakpoints.up("md")]: {
      marginTop: "1rem",
    },
    marginTop: 0,
  },
}));

const TodoItem = ({
  todoData,
  isNew,
  setNew,
  setCreatedTodo,
  user,
  setUser,
  editable = true,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [userToken, setUserToken] = useState(useContext(UserContext));

  const checkTokenExpiry = () => {
    checkToken(userToken, setUserToken, dispatch, history);
  };

  //State of to-do item (edit mode)
  const [editing, setEditing] = useState(isNew);

  //To-do data
  const [todo, setTodo] = useState(todoData);

  //To-do data in edit mode before being saved
  const [editTodo, setEditTodo] = useState(todo);

  const [tagOptions, setTagOptions] = useState(user ? user.tags : []);

  useEffect(() => {
    if (user._id) {
      dispatch(updateUser(user._id, user));
      dispatch(resetToken(user));
      setTagOptions(user.tags);
    }
  }, [user]);

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

  const [tagOpen, setTagOpen] = useState(false);
  const [forceTagOpen, setForceTagOpen] = useState(false);

  //State of new tag in process of creation
  const [newTag, setNewTag] = useState("");

  //Opens to-do item edit mode
  const handleEditOpen = () => {
    checkTokenExpiry();
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
    checkTokenExpiry();

    if (isNew) {
      setNew(false);
      setCreatedTodo(true);
      dispatch(createTodo({ ...editTodo, dateDue: nextDay() }));
      setEditTodo(todo);
    } else {
      dispatch(updateTodo(todoData._id, { ...editTodo, dateDue: nextDay() }));
      setTodo(editTodo);
    }

    handleEditClose();
  };

  //Deletes to-do item
  const deleteTodoItem = () => {
    checkTokenExpiry();
    dispatch(deleteTodo(todoData._id));
  };

  //Open/close add menu
  const togglePrioMenu = (event) => {
    setPrioMenuIsOpen(!prioMenuIsOpen);
    setPrioAnchorEl(prioAnchorEl === null ? event.currentTarget : null);
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
    checkTokenExpiry();
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

  //Button displayed when no tag options are available
  const tagButton = (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <TextField
        style={{ flexGrow: 1, marginRight: 1 + "rem" }}
        placeholder="Create New Tag"
        onChange={(e) => setNewTag(e.target.value)}
        onMouseDown={() => {
          setForceTagOpen(true);
        }}
        onBlur={() => {
          setForceTagOpen(false);
          setTagOpen(false);
        }}
      ></TextField>
      <Button
        variant="outlined"
        color="primary"
        style={{ whiteSpace: "nowrap" }}
        onMouseDown={(e) => {
          e.preventDefault();
          checkTokenExpiry();

          if (newTag !== "" && !tagOptions.includes(newTag)) {
            setUser({ ...user, tags: [...tagOptions, newTag] });
            setNewTag("");
            setForceTagOpen(false);
          }
        }}
      >
        Add Tag
      </Button>
    </Box>
  );

  const deleteTag = (e, option) => {
    e.preventDefault();
    setUser({ ...user, tags: tagOptions.filter((tag) => tag !== option) });
  };

  const dayOfWeek = (day) => {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  };

  const dateDueDisplay = (repeat) => {
    switch (repeat) {
      case "None":
        break;
      case "Daily":
        return (
          <>
            <br />
            Repeats daily
          </>
        );
      case "Weekly":
        return (
          <>
            <br />
            Repeats every {dayOfWeek(todo.repeatWeekly)}
          </>
        );
      case "Monthly":
        return (
          <>
            <br />
            Repeats every {dayOfWeek(todo.repeatMonthly)}
          </>
        );
      default:
        return null;
    }
  };

  const nextDay = () => {
    switch (editTodo.repeatOption) {
      case "None":
        return editTodo.dateDue;
      case "Daily":
        return dayjs(editTodo.dateDue)
          .month(dayjs().month())
          .date(dayjs().date());
      case "Weekly":
        return dayjs().day() < editTodo.repeatWeekly
          ? dayjs()
              .startOf("week")
              .add(editTodo.repeatWeekly, "day")
              .hour(dayjs(editTodo.dateDue).hour())
              .minute(dayjs(editTodo.dateDue).minute())
          : dayjs()
              .startOf("week")
              .add(1, "week")
              .add(editTodo.repeatWeekly, "day")
              .hour(dayjs(editTodo.dateDue).hour())
              .minute(dayjs(editTodo.dateDue).minute());
      case "Monthly":
        return dayjs().date() < todo.repeatMonthly
          ? dayjs()
              .startOf("month")
              .add(editTodo.repeatMonthly, "day")
              .hour(dayjs(editTodo.dateDue).hour())
              .minute(dayjs(editTodo.dateDue).minute())
          : dayjs()
              .startOf("month")
              .add(1, "month")
              .add(editTodo.repeatMonthly, "day")
              .hour(dayjs(editTodo.dateDue).hour())
              .minute(dayjs(editTodo.dateDue).minute());
      default:
        break;
    }
  };

  switch (todo.repeatOption) {
    case "None":
      if (todo.checked) {
        dispatch(deleteTodo(todo._id));
      }
      break;
    case "Daily":
      if (dayjs().isAfter(dayjs(todo.dateDue), "day") && todo.checked) {
        let updatedTodo = {
          ...todo,
          checked: false,
          dateDue: nextDay(),
        };
        setEditTodo(updatedTodo);
        setTodo(updatedTodo);
        dispatch(updateTodo(todo._id, updatedTodo));
      } else if (todo.checked) {
        let updatedTodo = {
          ...todo,
          checked: false,
          dateDue: dayjs(todo.dateDue).month(dayjs().month()).add(1, "day"),
        };
        setEditTodo(updatedTodo);
        setTodo(updatedTodo);
        dispatch(updateTodo(todo._id, updatedTodo));
      }
      break;
    case "Weekly":
      if (dayjs().isAfter(dayjs(todo.dateDue), "day") && todo.checked) {
        let updatedTodo = {
          ...todo,
          checked: false,
          dateDue: nextDay(),
        };
        setEditTodo(updatedTodo);
        setTodo(updatedTodo);
        dispatch(updateTodo(todo._id, updatedTodo));
      }
      break;
    case "Monthly":
      if (dayjs().isAfter(dayjs(todo.dateDue), "day") && todo.checked) {
        let updatedTodo = {
          ...todo,
          checked: false,
          dateDue: nextDay(),
        };
        setEditTodo(updatedTodo);
        setTodo(updatedTodo);
        dispatch(updateTodo(todo._id, updatedTodo));
      }
      break;
    default:
      break;
  }

  //To-do item in edit mode
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
                  clearOnBlur={false}
                  open={tagOpen}
                  onOpen={() => setTagOpen(true)}
                  onClose={(e) => {
                    if (!forceTagOpen) setTagOpen(false);
                  }}
                  fullWidth
                  options={tagOptions ? tagOptions : []}
                  filterSelectedOptions
                  noOptionsText={tagButton}
                  value={editTodo.tags}
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
                  renderOption={(option) => (
                    <li
                      style={{
                        display: "flex",
                        flexGrow: 1,
                      }}
                    >
                      <div style={{ margin: "auto" }}>{option}</div>
                      <div style={{ flexGrow: 1 }} />
                      <IconButton onClick={(e) => deleteTag(e, option)}>
                        <CloseIcon />
                      </IconButton>
                    </li>
                  )}
                  onChange={(e, newTags) => {
                    setEditTodo({ ...editTodo, tags: newTags });
                  }}
                />
              </Grid>
            </Grid>

            <Divider className={classes.divider} />

            <Grid
              container
              item
              className={classes.taskInner}
              alignItems="center"
              spacing={3}
            >
              <Grid container item className={classes.mobileDatePicker}>
                <DateTimePicker
                  minDate={new Date()}
                  variant="inline"
                  format="HH:mm - MMM DD, YYYY"
                  value={editTodo.dateDue}
                  onChange={(e) => setEditTodo({ ...editTodo, dateDue: e })}
                  label="Due Date"
                  style={{
                    display: editTodo.repeatOption === "None" ? "flex" : "none",
                  }}
                />

                <TimePicker
                  minDate={new Date()}
                  variant="inline"
                  format="HH:mm"
                  value={editTodo.dateDue}
                  onChange={(e) => setEditTodo({ ...editTodo, dateDue: e })}
                  label="Daily Repeat"
                  style={{
                    display:
                      editTodo.repeatOption === "Daily" ? "flex" : "none",
                  }}
                />

                <ToggleButtonGroup
                  value={editTodo.repeatWeekly}
                  className={classes.toggleButtonMargin}
                  exclusive
                  onChange={(e, newDay) => {
                    if (newDay !== editTodo.repeatWeekly)
                      setEditTodo({ ...editTodo, repeatWeekly: newDay });
                  }}
                  size="small"
                  style={{
                    display:
                      editTodo.repeatOption === "Weekly" ? "flex" : "none",
                  }}
                >
                  <ToggleButton value={0}>
                    <Typography>Sun</Typography>
                  </ToggleButton>

                  {/*
                  The InputLabel is placed in the middle of all the ToggleButtons
                  because the ToggleButtons have special styles applied to the
                  first and last child of the ToggleButtonGroup. By placing
                  the label in the middle, these styles are not disrupted.
                  */}
                  <InputLabel shrink style={{ position: "absolute", top: 0 }}>
                    Weekly Repeat
                  </InputLabel>

                  <ToggleButton value={1}>
                    <Typography>Mon</Typography>
                  </ToggleButton>

                  <ToggleButton value={2}>
                    <Typography>Tue</Typography>
                  </ToggleButton>

                  <ToggleButton value={3}>
                    <Typography>Wed</Typography>
                  </ToggleButton>

                  <ToggleButton value={4}>
                    <Typography>Thu</Typography>
                  </ToggleButton>

                  <ToggleButton value={5}>
                    <Typography>Fri</Typography>
                  </ToggleButton>

                  <ToggleButton value={6}>
                    <Typography>Sat</Typography>
                  </ToggleButton>
                </ToggleButtonGroup>

                <TimePicker
                  minDate={new Date()}
                  variant="inline"
                  format="HH:mm"
                  value={editTodo.dateDue}
                  onChange={(e) => setEditTodo({ ...editTodo, dateDue: e })}
                  label="Set Time"
                  style={{
                    display:
                      editTodo.repeatOption === "Weekly" ? "flex" : "none",
                    width: 100,
                    marginLeft: 15,
                  }}
                />

                <TextField
                  label="Monthly Repeat"
                  type="number"
                  value={editTodo.repeatMonthly}
                  onChange={(e) =>
                    setEditTodo({
                      ...editTodo,
                      repeatMonthly:
                        e.target.value > 31 || e.target.value < 1
                          ? e.target.value.length === 0
                            ? e.target.value
                            : 31
                          : e.target.value,
                    })
                  }
                  onBlur={(e) => {
                    if (e.target.value.length === 0)
                      setEditTodo({ ...editTodo, repeatMonthly: 1 });
                  }}
                  inputProps={{ min: 1, max: 31, maxLength: 2 }}
                  style={{
                    display:
                      editTodo.repeatOption === "Monthly" ? "flex" : "none",
                    width: 115,
                  }}
                />

                <TimePicker
                  minDate={new Date()}
                  variant="inline"
                  format="HH:mm"
                  value={editTodo.dateDue}
                  onChange={(e) => setEditTodo({ ...editTodo, dateDue: e })}
                  label="Set Time"
                  style={{
                    display:
                      editTodo.repeatOption === "Monthly" ? "flex" : "none",
                    width: 100,
                    marginLeft: 15,
                  }}
                />
              </Grid>

              <Grid container item justifyContent="center">
                <ToggleButtonGroup
                  value={editTodo.repeatOption}
                  exclusive
                  onChange={(e, newRepeat) => {
                    if (newRepeat)
                      setEditTodo({ ...editTodo, repeatOption: newRepeat });
                  }}
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

            <Grid container item className={classes.mobileEditIcons}>
              <Button
                onClick={handleEditSave}
                variant="contained"
                color="primary"
                className={classes.saveButton}
              >
                <CheckCircleOutlineIcon />
                <Typography className={classes.buttonText}>
                  {isNew ? "Add Task" : "Save Task"}
                </Typography>
              </Button>

              <Button
                onClick={handleEditCancel}
                variant="contained"
                color="secondary"
                className={classes.saveButton}
              >
                <CancelOutlinedIcon />
                <Typography className={classes.buttonText}>Cancel</Typography>
              </Button>
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
            <Grid item style={{ height: "100%", margin: 0, padding: 0 }}>
              <div
                style={{
                  height: "100%",
                  flexGrow: 1,
                  width: 20,
                  backgroundColor: prioColor(),
                }}
              />
            </Grid>
            <Grid container item justifyContent="center" xs={1}>
              <Grid item>
                <Checkbox checked={todo.checked} onClick={handleCheck} />
              </Grid>

              <Grid item style={{ display: editable ? "flex" : "none" }}>
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    onClick={handleEditOpen}
                    className={classes.mobileIconsDisplay}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Grid>

              <Grid item style={{ display: editable ? "flex" : "none" }}>
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
              style={{ flexWrap: "nowrap", paddingLeft: 0 }}
            >
              <Grid item>
                <Typography variant="h5">{todo.title}</Typography>

                <Typography variant="caption">
                  {todo.tags.map((tag, index) => {
                    return index !== todo.tags.length - 1 ? tag + ", " : tag;
                  })}
                </Typography>

                <Typography noWrap variant="subtitle1">
                  Due Date:{" "}
                  {dayjs(todo.dateDue).format("HH:mm on MMM DD, YYYY")}
                  {dateDueDisplay(todo.repeatOption)}
                </Typography>
              </Grid>

              <Grid
                container
                item
                justifyContent="flex-end"
                className={classes.desktopIconsDisplay}
              >
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    onClick={handleEditOpen}
                    style={{ display: editable ? "flex" : "none" }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="top">
                  <IconButton
                    onClick={deleteTodoItem}
                    style={{ display: editable ? "flex" : "none" }}
                  >
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
