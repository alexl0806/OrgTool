//import a bunch of stuff
import React, { useState } from "react";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Input from './Input.js';
import Nav from '../Home/LandNav.js';

//making the styles 
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
  },

  form: {
    
  },

  submit: {

  },

}));

//starting off with the sign up & log in forms
const Auth = () => {
  const classes = useStyles();
  
  const [isSignup, setSignup] = useState(false); //switch between sign up & sign up

  const [showPassword, setShowPassword] = useState(false); //for the show password stuff

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword); //toggles show password

  const switchMode = () => setSignup((previsSignup) => !previsSignup); //switch between sign up & sign up

  const handleSubmit = () => { //submit button

  };

  const handleChange = () => {

  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant = "h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && ( //if and only if sign up is true --> display first name & last name
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                </>
              )}
              <Input name = "email" label = "Email Address" handleChange={handleChange} type="email" />
              <Input name = "password" label = "Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
          </Grid> 
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
