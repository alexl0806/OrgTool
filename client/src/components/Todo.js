import React from "react";

import { Typography, List, ListItem, Divider } from "@material-ui/core";

import TodoItem from "./TodoItem.js";

const Todo = () => {
  return (
    <>
      <Typography variant="h4">To-do List</Typography>
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
