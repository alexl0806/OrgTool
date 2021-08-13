import React from "react";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandNav from "./LandNav.js";

const Features = () => {
  return (
    <>
      <LandNav />
      <h1>Features</h1>
    </>
  );
};

export default Features;
