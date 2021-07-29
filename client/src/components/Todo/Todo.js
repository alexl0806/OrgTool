import React, { useState } from "react";
import { useSelector } from "react-redux";

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

import TodoItem from "./TodoItem.js";

import AddIcon from "@material-ui/icons/Add";

const Todo = () => {
  //If a new to-do item is being created
  const [creatingTodo, setCreatingTodo] = useState(false);

  //If a new to-do item has just been created
  const [createdTodo, setCreatedTodo] = useState(false);

  //Default to-do item properties
  const [defaultTodo, setDefaultTodo] = useState({
    title: "Task",
    dateDue: new Date(),
    repeatOption: "None",
    dateCreated: new Date(),
    priority: 3,
    checked: false,
    repeatWeekly: 0,
    repeatMonthly: 1,
    tags: [],
  });

  //Gets all to-do items
  const todos = useSelector((state) => state.todos);

  const createNewTodo = () => {
    if (!creatingTodo) {
      //Updates default date/time to current date/time every time add task is pressed
      setDefaultTodo({
        ...defaultTodo,
        dateDue: new Date(),
        dateCreated: new Date(),
      });
      setCreatingTodo(true);
    }
  };

  function quickSort(arr, leftPos, rightPos, arrLength) {
    let initialLeftPos = leftPos;
    let initialRightPos = rightPos;
    let direction = true;
    let pivot = rightPos;

    while (leftPos - rightPos < 0) {
      if (direction) {
        if (arr[pivot].priority < arr[leftPos].priority) {
          quickSort.swap(arr, pivot, leftPos);
          pivot = leftPos;
          rightPos--;
          direction = !direction;
        } else leftPos++;
      } else {
        if (arr[pivot].priority <= arr[rightPos].priority) {
          rightPos--;
        } else {
          quickSort.swap(arr, pivot, rightPos);
          leftPos++;
          pivot = rightPos;
          direction = !direction;
        }
      }
    }
    if (pivot - 1 > initialLeftPos) {
      quickSort(arr, initialLeftPos, pivot - 1, arrLength);
    }
    if (pivot + 1 < initialRightPos) {
      quickSort(arr, pivot + 1, initialRightPos, arrLength);
    }
  }

  quickSort.swap = (arr, el1, el2) => {
    let swapedElem = arr[el1];
    arr[el1] = arr[el2];
    arr[el2] = swapedElem;
  };

  if (todos.length > 0) {
    var sortedArray = createdTodo
      ? todos.slice(0, todos.length - 1)
      : todos.slice(0);
    quickSort(sortedArray, 0, sortedArray.length - 1, sortedArray.length);
  }

  const displayItems = () => {
    if (todos.length > 0)
      return (
        <>
          {createdTodo ? (
            <ListItem key={todos[todos.length - 1]._id}>
              <Badge
                color="secondary"
                badgeContent="New!"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                style={{ flexGrow: 1 }}
              >
                <TodoItem
                  todoData={todos[todos.length - 1]}
                  isNew={false}
                  setNew={setCreatingTodo}
                  style={{ border: "3px solid red" }}
                  setCreatedTodo={setCreatedTodo}
                />
              </Badge>
            </ListItem>
          ) : null}

          <Divider />

          {sortedArray.map((todo) => (
            <ListItem key={todo._id}>
              <TodoItem
                todoData={todo}
                isNew={false}
                setNew={setCreatingTodo}
                setCreatedTodo={setCreatedTodo}
              />
            </ListItem>
          ))}
        </>
      );
  };

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography variant="h4">To-do List</Typography>

        <div style={{ flexGrow: 1 }}></div>

        <IconButton color="primary" onClick={createNewTodo}>
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>

      <Divider />

      <List>
        <Collapse in={creatingTodo}>
          <ListItem key="new">
            <TodoItem
              todoData={defaultTodo}
              isNew={true}
              setNew={setCreatingTodo}
              setCreatedTodo={setCreatedTodo}
            />
          </ListItem>
        </Collapse>

        {displayItems()}
      </List>
    </>
  );
};

export default Todo;
