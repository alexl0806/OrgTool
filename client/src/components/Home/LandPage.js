import React from "react";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandNav from "./LandNav.js";

const LandPage = () => {
  return (
    <>
      <LandNav />
      <h1>LandPage</h1>
    </>
  );
};

export default LandPage;
