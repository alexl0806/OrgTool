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
} from "@material-ui/core";

import TodoItem from "./TodoItem.js";

import AddIcon from "@material-ui/icons/Add";

const Todo = () => {
  //If a new to-do item is being created
  const [creatingTodo, setCreatingTodo] = useState(false);

  //Default to-do item properties
  const [defaultTodo, setDefaultTodo] = useState({
    title: "Task",
    dateDue: new Date(),
    repeatOption: "None",
    dateCreated: new Date(),
    priority: 3,
    checked: false,
    repeatOption: "None",
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
            />
          </ListItem>
        </Collapse>

        {todos
          .slice(0)
          .reverse()
          .map((todo) => (
            <ListItem key={todo._id}>
              <TodoItem
                todoData={todo}
                isNew={false}
                setNew={setCreatingTodo}
              />
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default Todo;
