import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import dayjs from "dayjs";

import {
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  Badge,
} from "@material-ui/core";

import TodoItem from "./Todo/TodoItem/TodoItem.js";
import TagMenu from "./Todo/TagMenu.js";
import SortMenu from "./Todo/SortMenu.js";

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

const Today = () => {
  const classes = useStyles();

  //Gets user
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.result
  );

  //Property to sort to-do items by
  const [sortVar, setSortVar] = useState("priority");

  //Property to sort to-do items by
  const [sortTags, setSortTags] = useState([]);

  //Gets all to-do items
  const todos = useSelector((state) => state.todos.todos);

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
        .filter(
          (todo) =>
            dayjs(todo.dateDue).isSame(new Date(), "day") &&
            sortTags.every((tag) => todo.tags.includes(tag))
        );
    } else {
      return todos
        .slice(0, end)
        .filter((todo) => dayjs(todo.dateDue).isSame(new Date(), "day"));
    }
  };

  if (todos.length > 0) {
    var sortedArray = sortByTags(todos.length);

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
          {sortedArray.map((todo) => (
            <ListItem key={todo._id}>
              <TodoItem
                todoData={todo}
                isNew={false}
                user={user}
                setUser={setUser}
                editable={false}
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
        <Typography variant="h4">Today</Typography>

        <div style={{ flexGrow: 1 }}></div>

        <div className={classes.desktopSelect}>{selectMenus()}</div>
      </Box>

      <div className={classes.mobileSelect}>{selectMenus()}</div>

      <Divider />

      <List>{displayItems()}</List>
    </>
  );
};

export default Today;
