//import a bunch of stuff
import React, { useState, useEffect } from "react";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Input from "./Input.js";
import { signin, signup, forgetpass } from "../../actions/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Error from "./Error.js";

import LandNav from "../Home/LandNav.js";

//making the styles
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2, 3, 1, 3),
  },

  words: {
    fontFamily: "Segoe UI",
    fontWeight: 400,
    margin: theme.spacing(0, 0, 1, 0),
  },

  form: {
    width: "100%",
    margin: theme.spacing(1, 0, 0, 0),
  },

  submit: {
    margin: theme.spacing(2, 0, 1),
  },

  email: {
    fontFamily: "Segoe UI",
    margin: theme.spacing(0, 0, 1, 3),
  },
}));

//information from the form
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

//starting off with the sign up & log in forms
const Auth = () => {
  const [formData, setFormData] = useState(initialState); //form data
  const classes = useStyles(); //styling
  const dispatch = useDispatch(); //backend business
  const history = useHistory(); 

  const [isSignup, setSignup] = useState(false); //switch between sign up & sign up
  const switchMode = () => {
    setSignup((previsSignup) => !previsSignup); //switch between sign up & sign up
    setForgot(false); //turn off reset mode
    setHasError(false); //turn off the incorrect entry
    clearField(); //clears all text fields
  };

  //clear text fields on switch modes code
  const [isClear, setClear] = useState(false);

  useEffect(() => {
    setClear(false);
  }, [formData]);

  const clearField = () => {
    setFormData(initialState);
    setClear(true);
  }

  const [isForgot, setForgot] = useState(false); //switch between sign up & forget password
  const switchForget = () => {
    setForgot(true); //toggles between other pages
    setSignup(true); //always returns to login page
    clearField();
  };

  const [showPassword, setShowPassword] = useState(false); //for the show password stuff
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword); //toggles show password

  const [hasError, setHasError] = useState(false); //for the error repeat password

  useEffect(() => {
    if (formData.password !== formData.confirmPassword && isSignup) {
      setHasError(true);
    }
  }, [formData]);

  //error validation (shows the popup)
  const errorState = useSelector((state) => state.authReducer);

  useEffect(() => {
    setHasError(errorState.error);
  }, [errorState]);

  const handleSubmit = (e) => {
    //submit button
    e.preventDefault(); //stops page from refreshing

    //dispatch the information
    if (isForgot) {
      dispatch(forgetpass(formData, history));
      console.log(formData);
    } else if (isSignup) {
      dispatch(signup(formData, history));
      console.log(formData);
    } else {
      dispatch(signin(formData, history));
      console.log(formData);
    }
  };

  const handleChange = (e) => { //when the form inputs get changed
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setHasError(false);
  };

  return (
    <>
      <LandNav />
      <Container component="main" maxWidth="xs">
        <Error //the actual popup for the error
          error={errorState.errorMessage}
          open={hasError}
          setOpen={setHasError}
        />
        <Paper className={classes.paper} elevation={3}>
          <Typography variant="h5" className={classes.words}>
            {isForgot ? "Reset Password" : isSignup ? "Sign Up" : "Sign In"}
            {/*if not reset password then decide if it's the other two*/}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isForgot ? (
                <>
                  <Typography className={classes.email}>
                    Please Enter An Email Address for Recovery
                  </Typography>
                </>
              ) : (
                isSignup && ( //if and only if sign up is true --> display first name & last name
                  <>
                    <Input
                      name="firstName"
                      label="First Name"
                      handleChange={handleChange}
                      autoFocus
                      half
                      clear = {isClear}
                    />
                    <Input
                      name="lastName"
                      label="Last Name"
                      handleChange={handleChange}
                      half
                      clear = {isClear}
                    />
                  </>
                )
              )}

              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
                clear = {isClear}
              />
              {!isForgot && (
                <>
                  <Input
                    name="password"
                    label="Password"
                    handleChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    handleShowPassword={handleShowPassword}
                    clear = {isClear}
                  />
                  {isSignup && (
                    <Input
                      name="confirmPassword"
                      label="Repeat Password"
                      handleChange={handleChange}
                      type="password"
                      hasError={hasError}
                      clear = {isClear}
                    />
                  )}
                </>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isForgot
                ? "Send Verification Email"
                : isSignup
                ? "Sign Up"
                : "Sign In"}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isForgot
                    ? "Return to Login"
                    : isSignup
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign up"}
                </Button>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
                {isSignup ? null : (
                  <Button onClick={switchForget}>Forgot Your Password?</Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Auth;