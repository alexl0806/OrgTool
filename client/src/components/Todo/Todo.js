import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import clsx from "clsx";

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

const useStyles = makeStyles((theme) => ({
  createForm: {
    display: "none",
  },
}));

const Todo = () => {
  const classes = useStyles();

  const [creatingTodo, setCreatingTodo] = useState(false);
  const defaultTodo = {
    title: "Task",
    dateDue: new Date(),
    dateCreated: new Date(),
  };

  const todos = useSelector((state) => state.todos);

  const createNewTodo = () => {
    if (!creatingTodo) {
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
        <ListItem className={clsx({ [classes.createForm]: !creatingTodo })}>
          <TodoItem
            todoData={defaultTodo}
            isNew={true}
            setNew={setCreatingTodo}
          />
        </ListItem>
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
