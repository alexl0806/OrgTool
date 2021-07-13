import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";

const CreateTodo = ({ isOpen, toggleForm }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          name="task"
          variant="outlined"
          label="Task"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleForm} color="primary">
          Cancel
        </Button>
        <Button onClick={toggleForm} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTodo;
