import React from "react";

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
  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography variant="h4">To-do List</Typography>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton color="primary">
          <AddIcon />
        </IconButton>
      </Box>
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
