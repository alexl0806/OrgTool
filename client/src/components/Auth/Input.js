//import a bunch of stuff
import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

//makes the code cleaner :D
const Input = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
  hasError,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        //properties for the inputs
        name={name}
        onChange={handleChange}
        variant={"outlined"}
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        error={hasError}
        helperText={hasError ? "Passwords don't match" : null}
        //show password button
        InputProps={
          name === "password" && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
      />
    </Grid>
  );
};

export default Input;
