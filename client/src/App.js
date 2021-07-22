import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandNav from "./components/Home/LandNav.js";

import { getTodos } from "./actions/todos";

import AppNavbar from "./components/AppNavbar/AppNavbar.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        {/*Pages that require a user to be signed in*/}
        <Route path="/user">
          <AppNavbar />
        </Route>
        {/*Pages that do not require a user to be signed in*/}
        <Route path="/">
          <LandNav />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
