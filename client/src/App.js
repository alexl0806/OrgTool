import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LandNav from "./components/Home/LandNav.js";
import Auth from "./components/Auth/Auth.js";

import { getTodos } from "./actions/todos";

import AppNavbar from "./components/AppNavbar/AppNavbar.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const isLogin = () => {
    if (localStorage.getItem("profile")) return true;

    return false;
  };

  return (
    <Router>
      <Switch>
        {/*Pages that require a user to be signed in*/}
        <Route path="/user">
          <LandNav isLogin={isLogin} />
        </Route>
        {/*Pages that do not require a user to be signed in*/}
        <Route path="/home">
          <LandNav isLogin={isLogin} />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/features">
          <LandNav isLogin={isLogin} />
        </Route>
        <Route path="/login">
          <LandNav isLogin={isLogin} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
