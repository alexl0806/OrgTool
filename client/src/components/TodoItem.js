import React from "react";

import { IconButton, Typography, Box, Container } from "@material-ui/core";

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const TodoItem = () => {
  return (
    <>
      <Box display="flex" flexDirection="row">
        <IconButton>
          <CheckCircleOutlineIcon />
        </IconButton>
        <Container>
          <Typography variant="h5">Task</Typography>
          <Typography variant="subtitle1">Due Date:</Typography>
        </Container>
      </Box>
    </>
  );
};

export default TodoItem;
