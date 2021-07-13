import React, { useState } from "react";
import { useSelector } from "react-redux";

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
import CreateTodo from "./Forms/CreateTodo.js";

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const [formIsOpen, setFormIsOpen] = useState(false);

  const toggleForm = () => {
    setFormIsOpen(!formIsOpen);
  };

  console.log(todos);

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography variant="h4">To-do List</Typography>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton color="primary" onClick={toggleForm}>
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>
      <CreateTodo isOpen={formIsOpen} toggleForm={toggleForm} />
      <Divider />
      <List>
        <ListItem key="">
          <TodoItem />
        </ListItem>
      </List>
    </>
  );
};

export default Todo;
