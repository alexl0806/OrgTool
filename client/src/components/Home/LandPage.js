import React from "react";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Link } from "react-router-dom";
import { pulse } from 'react-animations';

import LandNav from "./LandNav.js";

const useStyles = makeStyles((theme) => ({

}));

const LandPage = () => {
  const classes = useStyles();
  return (
    <>
      <LandNav />
      <h1>LandPage</h1>
    </>
  );
};

export default LandPage;
