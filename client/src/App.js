import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";

import LandPage from "./components/Home/LandPage.js";
import Auth from "./components/Auth/Auth.js";
import AppNavbar from "./components/AppNavbar/AppNavbar.js";

import { getTodos } from "./actions/todos";
import isLogin from "./utils/authUser.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        {/*Pages that require a user to be signed in*/}
        <Route
          path="/user"
          render={() => (isLogin() ? <AppNavbar /> : <Redirect to="/login" />)}
        />
        {/*Pages that do not require a user to be signed in*/}
        <Route path="/home" component={LandPage} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route
          path="/login"
          render={() => (isLogin() ? <Redirect to="/user" /> : <Auth />)}
        />
      </Switch>
    </Router>
  );
}

export default App;
