import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { createTodo } from "../../actions/todos";

import {
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  IconButton,
} from "@material-ui/core";

import TodoItem from "./TodoItem.js";

import AddIcon from "@material-ui/icons/Add";

const Todo = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);

  const createNewTodo = () => {
    dispatch(createTodo());
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
        {todos.map((todo) => (
          <ListItem key={todo._id}>
            <TodoItem todoData={todo} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Todo;
