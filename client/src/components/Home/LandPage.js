import React, { Fragment } from "react";
import LandNav from './LandNav.js'; 
import { BrowserRouter as Route, Link } from "react-router-dom";
import styles from "./LandPage.module.scss";
import GlobalStyle from './globalStyles.js';

const LandPage = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <LandNav/>
        <section>
          <h1 className={styles.text}> Welcome to <br/> the Study Buddy!</h1>
          <Link to="/user">
            <button className={styles.btn}> Explore </button>
          </Link>
        </section>
    </Fragment>
  );
};

export default LandPage;

