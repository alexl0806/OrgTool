import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

import {
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  IconButton,
  Collapse,
  Badge,
} from "@material-ui/core";

import TodoItem from "./TodoItem/TodoItem.js";
import TagMenu from "./TagMenu.js";
import SortMenu from "./SortMenu.js";

import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  desktopSelect: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    display: "none",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  mobileSelect: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const Todo = () => {
  const classes = useStyles();

  //Gets user
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.result
  );

  //If a new to-do item is being created
  const [creatingTodo, setCreatingTodo] = useState(false);

  //If a new to-do item has just been created
  const [createdTodo, setCreatedTodo] = useState(false);

  //Property to sort to-do items by
  const [sortVar, setSortVar] = useState("priority");

  //Property to sort to-do items by
  const [sortTags, setSortTags] = useState([]);

  //Default to-do item properties
  const [defaultTodo, setDefaultTodo] = useState({
    title: "Task",
    creator: user?._id,
    dateDue: new Date().setSeconds(0, 0),
    repeatOption: "None",
    dateCreated: new Date().setSeconds(0, 0),
    priority: 3,
    checked: false,
    repeatWeekly: 0,
    repeatMonthly: 1,
    tags: [],
  });

  //Gets all to-do items
  const todos = useSelector((state) => state.todos.todos);

  const createNewTodo = () => {
    if (!creatingTodo) {
      //Updates default date/time to current date/time every time add task is pressed
      setDefaultTodo({
        ...defaultTodo,
        dateDue: new Date().setSeconds(0, 0),
        dateCreated: new Date().setSeconds(0, 0),
      });
      setCreatingTodo(true);
    }
  };

  //Sorting algorithms
  const quickSort = (arr, leftPos, rightPos, arrLength, sortBy) => {
    let initialLeftPos = leftPos;
    let initialRightPos = rightPos;
    let direction = true;
    let pivot = rightPos;
    let arrPivot, arrLeft, arrRight;
    let secPivot, secLeft, secRight;

    while (leftPos - rightPos < 0) {
      switch (sortBy) {
        case "priority":
          arrPivot = arr[pivot].priority;
          arrLeft = arr[leftPos].priority;
          arrRight = arr[rightPos].priority;
          secPivot = arr[pivot].dateDue;
          secLeft = arr[leftPos].dateDue;
          secRight = arr[rightPos].dateDue;
          break;
        case "dateDue":
          arrPivot = arr[pivot].dateDue;
          arrLeft = arr[leftPos].dateDue;
          arrRight = arr[rightPos].dateDue;
          secPivot = arr[pivot].priority;
          secLeft = arr[leftPos].priority;
          secRight = arr[rightPos].priority;
          break;
        case "name":
          arrPivot = arr[pivot].title;
          arrLeft = arr[leftPos].title;
          arrRight = arr[rightPos].title;
          secPivot = arr[pivot].dateDue;
          secLeft = arr[leftPos].dateDue;
          secRight = arr[rightPos].dateDue;
          break;
        default:
          break;
      }

      if (direction) {
        if (arrPivot < arrLeft) {
          quickSort.swap(arr, pivot, leftPos);
          pivot = leftPos;
          rightPos--;
          direction = !direction;
        } else {
          if (arrPivot === arrLeft && secPivot < secLeft)
            quickSort.swap(arr, pivot, leftPos);
          else leftPos++;
        }
      } else {
        if (arrPivot <= arrRight) {
          if (arrPivot === arrRight && secPivot > secRight)
            quickSort.swap(arr, pivot, rightPos);
          else rightPos--;
        } else {
          quickSort.swap(arr, pivot, rightPos);
          leftPos++;
          pivot = rightPos;
          direction = !direction;
        }
      }
    }
    if (pivot - 1 > initialLeftPos) {
      quickSort(arr, initialLeftPos, pivot - 1, arrLength, sortBy);
    }
    if (pivot + 1 < initialRightPos) {
      quickSort(arr, pivot + 1, initialRightPos, arrLength, sortBy);
    }
  };

  quickSort.swap = (arr, el1, el2) => {
    let swapedElem = arr[el1];
    arr[el1] = arr[el2];
    arr[el2] = swapedElem;
  };

  const sortByTags = (end) => {
    if (sortTags.length > 0) {
      return todos
        .slice(0, end)
        .filter((todo) => sortTags.every((tag) => todo.tags.includes(tag)));
    } else {
      return todos.slice(0, end);
    }
  };

  if (todos.length > 0) {
    var sortedArray = createdTodo
      ? sortByTags(todos.length - 1)
      : sortByTags(todos.length);

    quickSort(
      sortedArray,
      0,
      sortedArray.length - 1,
      sortedArray.length,
      sortVar
    );
  }

  //List of to-do items
  const displayItems = () => {
    if (todos.length > 0)
      return (
        <>
          {createdTodo ? (
            <>
              <ListItem key={todos[todos.length - 1]._id}>
                <Badge
                  color="secondary"
                  badgeContent="New!"
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  style={{ width: "inherit" }}
                >
                  <TodoItem
                    todoData={todos[todos.length - 1]}
                    isNew={false}
                    setNew={setCreatingTodo}
                    style={{ border: "3px solid red" }}
                    setCreatedTodo={setCreatedTodo}
                    user={user}
                    setUser={setUser}
                  />
                </Badge>
              </ListItem>
              <Divider />
            </>
          ) : null}

          {sortedArray.map((todo) => (
            <ListItem key={todo._id}>
              <TodoItem
                todoData={todo}
                isNew={false}
                setNew={setCreatingTodo}
                setCreatedTodo={setCreatedTodo}
                user={user}
                setUser={setUser}
              />
            </ListItem>
          ))}
        </>
      );
  };

  //Sorting menus
  const selectMenus = () => {
    return (
      <>
        <SortMenu sortVar={sortVar} setSortVar={setSortVar} />

        <TagMenu
          sortTags={sortTags}
          setSortTags={setSortTags}
          tags={user.tags}
        />
      </>
    );
  };

  //To-do page
  return (
    <>
      <Box
        style={{ marginBottom: "1rem" }}
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Typography variant="h4">To-do List</Typography>

        <div style={{ flexGrow: 1 }}></div>

        <div className={classes.desktopSelect}>{selectMenus()}</div>

        <IconButton
          color="primary"
          onClick={createNewTodo}
          style={{ margin: 0, padding: 0 }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>

      <div className={classes.mobileSelect}>{selectMenus()}</div>

      <Divider />

      <List>
        <Collapse in={creatingTodo}>
          <ListItem key="new">
            <TodoItem
              todoData={defaultTodo}
              isNew={true}
              setNew={setCreatingTodo}
              setCreatedTodo={setCreatedTodo}
              user={user}
              setUser={setUser}
            />
          </ListItem>
        </Collapse>

        {displayItems()}
      </List>
    </>
  );
};

export default Todo;
