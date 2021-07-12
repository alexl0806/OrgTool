import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import getTodos from "./actions/todos";

import AppNavbar from "./components/AppNavbar/AppNavbar.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div>
      <AppNavbar />
    </div>
  );
}

export default App;
