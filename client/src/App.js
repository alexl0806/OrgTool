import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LandPage from "./components/Home/LandPage.js";
import Auth from "./components/Auth/Auth.js";
import AppNavbar from "./components/AppNavbar/AppNavbar.js";

import { isLogin } from "./utils/authUser.js";

function App() {
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
          component={Auth}
          // render={() => (isLogin() ? <Redirect to="/user" /> : <Auth />)}
        />
      </Switch>
    </Router>
  );
}

export default App;
