import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import { Typography, List, ListItem, Divider, Box } from "@material-ui/core";

import TodoItem from "../Todo/TodoItem/TodoItem.js";
import TagMenu from "../Todo/TagMenu.js";
import SortMenu from "../Todo/SortMenu.js";

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

  dayjs.extend(isBetween);

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
        .filter((todo) => sortTags.every((tag) => todo.tags.includes(tag)));
    } else {
      return todos.slice(0, end);
    }
  };

  if (todos.length > 0) {
    var sortedArray = sortByTags(todos.length).filter((todo) =>
      dayjs(todo.dateDue).isSame(new Date(), "day")
    );

    quickSort(
      sortedArray,
      0,
      sortedArray.length - 1,
      sortedArray.length,
      sortVar
    );

    var lateArray = sortByTags(todos.length).filter(
      (todo) => dayjs(todo.dateDue).isBefore(new Date(), "day") && !todo.checked
    );

    quickSort(lateArray, 0, lateArray.length - 1, lateArray.length, sortVar);

    var weekArray = sortByTags(todos.length).filter((todo) =>
      dayjs(todo.dateDue).isBetween(
        new Date(),
        dayjs(new Date()).add(1, "w"),
        "day",
        "(]"
      )
    );

    quickSort(weekArray, 0, weekArray.length - 1, weekArray.length, sortVar);
  }

  //List of to-do items
  const displayItems = (arr = todos) => {
    if (arr.length > 0)
      return (
        <>
          {arr.map((todo) => (
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
    else
      return (
        <Typography variant="h5" style={{ marginLeft: "2rem", color: "grey" }}>
          None
        </Typography>
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

      <Typography variant="h5" style={{ margin: "1rem 0 0 1rem" }}>
        Late
      </Typography>

      <Divider style={{ marginLeft: "1rem" }} />

      <List>{displayItems(lateArray)}</List>

      <Typography variant="h5" style={{ margin: "1rem 0 0 1rem" }}>
        Today
      </Typography>

      <Divider style={{ marginLeft: "1rem" }} />

      <List>{displayItems(sortedArray)}</List>

      <Typography variant="h5" style={{ margin: "1rem 0 0 1rem" }}>
        This Week
      </Typography>

      <Divider style={{ marginLeft: "1rem" }} />

      <List>{displayItems(weekArray)}</List>
    </>
  );
};

export default Today;
