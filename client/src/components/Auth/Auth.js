//import a bunch of stuff
import React, { useState, useEffect } from "react";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Input from "./Input.js";
import { signin, signup } from "../../actions/auth.js";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

//starting off with the sign up & log in forms
const Auth = () => {
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isSignup, setSignup] = useState(false); //switch between sign up & sign up
  const switchMode = () => {
    setSignup((previsSignup) => !previsSignup); //switch between sign up & sign up
    setForgot(false); //turn off reset mode
  };

  const [isForgot, setForgot] = useState(false); //switch between sign up & forget password
  const switchForget = () => {
    setForgot(true); //toggles between other pages
    setSignup(true); //always returns to login page
  };

  const [showPassword, setShowPassword] = useState(false); //for the show password stuff
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword); //toggles show password

  const [hasError, setHasError] = useState(false); //for the error repeat password

  const handleSubmit = (e) => {
    //submit button
    e.preventDefault(); //stops page from refreshing

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setHasError(false);
  };

  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setHasError(true);
    }
  }, [formData]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h5" className={classes.words}>
          {isForgot ? "Reset Password" : isSignup ? "Sign Up" : "Sign In"}
          {/*if not reset password then decide if it's the other two*/}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isForgot
              ? ""
              : isSignup && ( //if and only if sign up is true --> display first name & last name
                  <>
                    <Input
                      name="firstName"
                      label="First Name"
                      handleChange={handleChange}
                      autoFocus
                      half
                    />
                    <Input
                      name="lastName"
                      label="Last Name"
                      handleChange={handleChange}
                      half
                    />
                  </>
                )}
            {isForgot && (
              <>
                <Typography className={classes.email}>
                  Please Enter An Email Address for Recovery
                </Typography>
              </>
            )}

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            {!isForgot && (
              <>
                <Input
                  name="password"
                  label="Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
                {isSignup && (
                  <Input
                    name="confirmPassword"
                    label="Repeat Password"
                    handleChange={handleChange}
                    type="password"
                    hasError={hasError}
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
  );
};

export default Auth;
